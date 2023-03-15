require('dotenv').config({ path: '.env.test' });
const matchers = require('jest-extended');

const fs = require('fs');
const logger = require('../index');

expect.extend(matchers);

// eslint-disable-next-line no-promise-executor-return
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const today = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString().slice(0, 10);
};

const logName = process.env.LOG_NAME;
const logLevel = process.env.LOG_LEVEL;
const folder = process.env.LOG_PATH;
const files = logger.transports
  .map(transport => transport.filename)
  .map(filename => filename.replace('%DATE%', today()));

const logFrom = (type) => {
  const content = fs.readFileSync(`${folder}/${logName}_${type}.log`).toString().trim();
  if (!content) return [];
  return content.split('\n').map(JSON.parse);
};

const clearLogs = () => files
  .forEach(file => fs.writeFileSync(`${folder}/${file}`, '', () => {}));

describe('Logging Test.skips', () => {
  beforeEach(() => clearLogs());

  test('Logger Configuration', () => {
    expect(logger.level).toBe(logLevel);
    expect(logger.defaultMeta.service).toBe(logName);
    logger.transports.forEach((transport) => {
      const fileRegex = new RegExp(`${logName}_(${logLevel}|error|%DATE%).log`);
      expect(transport.dirname).toBe(folder);
      expect(transport.filename).toMatch(fileRegex);
    });
  });

  test('Log Errors', async () => {
    expect(logFrom('error')).toBeEmpty();
    logger.info('This is not written as an error');
    await sleep(500);
    expect(logFrom('error')).toBeEmpty();

    logger.error('This is an error log');
    await sleep(500);
    const errorLog = logFrom('error');
    expect(errorLog.length).toBe(1);
    const { timestamp, ...item }  = errorLog[0];
    expect(item).toEqual({
      message: 'This is an error log',
      service: 'testing',
      level: 'error',
    });
  });

  test('Log Level', async () => {
    expect(logFrom('error')).toBeEmpty();
    expect(logFrom(logLevel)).toBeEmpty();
    expect(logFrom(today())).toBeEmpty();

    logger.log(logLevel, 'This is a level log');
    await sleep(500);

    expect(logFrom('error')).toBeEmpty();
    expect(logFrom(logLevel)).not.toBeEmpty();
    expect(logFrom(today())).not.toBeEmpty();
    expect(logFrom(logLevel)).toEqual(logFrom(today()));

    const currentLog = logFrom(logLevel);
    expect(currentLog.length).toBe(1);
    const { timestamp, ...item }  = currentLog[0];
    expect(item).toEqual({
      level: logLevel,
      message: 'This is a level log',
      service: 'testing',
    });
  });

  test('Log Daily', async () => {
    expect(logFrom(logLevel)).toBeEmpty();
    expect(logFrom('error')).toBeEmpty();
    expect(logFrom(today())).toBeEmpty();

    logger.error('This is a daily log');
    await sleep(500);

    expect(logFrom(logLevel)).not.toBeEmpty();
    expect(logFrom('error')).not.toBeEmpty();
    expect(logFrom(today())).not.toBeEmpty();
    expect(logFrom(today())).toEqual(logFrom(logLevel));
    expect(logFrom(today())).toEqual(logFrom('error'));

    const currentLog = logFrom(today());
    expect(currentLog.length).toBe(1);
    const { timestamp, ...item }  = currentLog[0];
    expect(item).toEqual({
      level: 'error',
      service: 'testing',
      message: 'This is a daily log',
    });
  });
});
