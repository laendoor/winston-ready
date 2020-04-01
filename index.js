require('dotenv').config();
const { inspect } = require('util');
const { createLogger, format, transports } = require('winston');

const logLevel = process.env.LOG_LEVEL || 'info';
const logPath = process.env.LOG_PATH || 'logs/';
const logName = process.env.LOG_NAME || 'my-project';
const devLogLevel = process.env.DEV_LOG_LEVEL || process.env.LOG_LEVEL || 'debug';

const logger = createLogger({
  level: logLevel,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.splat(),
    format.json(),
  ),
  defaultMeta: { service: logName },
  transports: [
    new transports.File({ filename: `${logPath}/${logName}_error.log`, level: 'error' }),
    new transports.File({ filename: `${logPath}/${logName}_all.log` }),
    new transports.Console({
      level: process.env.NODE_ENV === 'development' ? devLogLevel : logLevel,
      handleExceptions: true,
      format: format.combine(
        format.splat(),
        format.colorize(),
        format.printf((error) => {
          const message = error.stack ? error.stack : error.message;
          return `${error.level}: ${inspect(message, { showHidden: true, depth: null, colors: true })}`;
        }),
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
