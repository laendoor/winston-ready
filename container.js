require('dotenv').config();
const { inspect } = require('util');
const winston = require('winston');
require('winston-daily-rotate-file');

const LOG_NAME = process.env.LOG_NAME || 'app';
const LOG_STYLE = process.env.LOG_STYLE || 'rotate'; // single, rotate, both
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const LOG_PATH = process.env.LOG_PATH || 'logs/';
const LOG_DAYS = process.env.LOG_DAYS || '180d';
const LOG_DATE_PATTERN = process.env.LOG_DATE_PATTERN || 'YYYY-MM-DD';
const LOG_CONSOLE = process.env.LOG_CONSOLE || 'on';
const LOG_CONSOLE_LEVEL = process.env.LOG_CONSOLE_LEVEL || 'debug';

// ***** Transports *****

const logTransport = () => new winston.transports.File({
  level: LOG_LEVEL,
  filename: `${LOG_PATH}/${LOG_NAME}_${LOG_LEVEL}.log`,
});

const errorTransport = () => new winston.transports.File({
  level: 'error',
  filename: `${LOG_PATH}/${LOG_NAME}_error.log`,
});

const dailyRotateTransport = () => new winston.transports.DailyRotateFile({
  dirname: LOG_PATH,
  filename: `${LOG_NAME}_%DATE%.log`,
  datePattern: LOG_DATE_PATTERN,
  maxFiles: LOG_DAYS,
});

const consoleTransport = () => new winston.transports.Console({
  level: LOG_CONSOLE_LEVEL,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.colorize(),
    winston.format.printf((error) => {
      const message = error.stack ? error.stack : error.message;
      return `${error.level}: ${inspect(message, { showHidden: true, depth: null, colors: true })}`;
    }),
  ),
});

// ***** Logger Containers *****

const container = new winston.Container();

const transports = [];

if (LOG_STYLE === 'single' || LOG_STYLE === 'both') {
  transports.push(logTransport());
  transports.push(errorTransport());
}

if (LOG_STYLE === 'rotate' || LOG_STYLE === 'both') {
  transports.push(dailyRotateTransport());
}

if (process.env.NODE_ENV === 'development' || LOG_CONSOLE === 'on') {
  transports.push(consoleTransport());
}

if (transports.length > 0) {
  container.add('default', {
    level: LOG_LEVEL,
    format: winston.format.combine(
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json(),
    ),
    defaultMeta: { service: LOG_NAME },
    transports,
    exitOnError: false,
  });
}

module.exports = {
  container,
  transports,
  winston,
};
