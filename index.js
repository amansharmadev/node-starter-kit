require('dotenv').config();

if (process.env.NODE_ENV === 'production') {
  console.log = () => {};
}

const express = require('express');
const routes = require('./routes');
const {
  logRequest,
  logResponse
} = require('./utils/morgan');
const logger = require('./utils/logger');

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.use(logRequest);
app.use(logResponse);

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
