require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}
const promClient = require('prom-client');
const express = require('express');
const routes = require('./routes');
const {
  logRequest,
  logResponse
} = require('./utils/morgan');
const logger = require('./utils/logger');

// Collection APP Metrics here
const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });


const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(logRequest);
app.use(logResponse);

/**
 * metrics exposing here
 */
app.get('/metrics', async (req, res) => {
  res.setHeader('Content-type', promClient.register.contentType);
  res.send(await register.metrics());
});
app.use('/', routes);

app.use('*', (req, res) => {
  res.status(404).send('NOT FOUND');
});

app.use((err, req, res, next) => {
  logger.error(err);
  res.status(err.status || 500).send(err.message || 'INTERNAL SERVER ERROR');
});

app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});
