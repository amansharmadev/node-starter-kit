const morgan = require('morgan');
const Logger = require('./logger');

const logRequest = morgan(':remote-addr :url :method HTTP/:http-version :user-agent', {
    immediate: true,
    stream: {
      write: (message) => {
        Logger.info(message.trim());
      }
    }
});
const logResponse = morgan(':remote-addr :url :method :status :res[content-length] :response-time ms', {
    stream: {
        write: (message) => {
            Logger.info(message.trim());
        }
    }
});

module.exports = {
    logRequest,
    logResponse,
};