const winston = require('winston');

const transports = [];


const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:' }),
    winston.format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),

            )
        })
    ],
});

const wrapper = ( original ) => {
    return (...args) => {
        const message = args.map(arg => {
            if (arg instanceof Error) {
                return `${arg.message}\n${arg.stack}`;
            }
            return typeof arg === 'object' ? JSON.stringify(arg, null, 2) : arg;
        }).join('\n');
        return original(message);
    };
};

logger.error = wrapper(logger.error);
logger.warn = wrapper(logger.warn);
logger.info = wrapper(logger.info);
logger.verbose = wrapper(logger.verbose);
logger.debug = wrapper(logger.debug);
logger.silly = wrapper(logger.silly);

module.exports = logger;