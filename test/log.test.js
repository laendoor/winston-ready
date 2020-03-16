require('jest-extended');
require('dotenv').config({ path: `${__dirname}/../.env.testing` });

const fs = require('fs');
const logger = require('../index');

const name   = logger.defaultMeta.service;
const folder = logger.transports[0].dirname;
const files  = fs.readdirSync(folder).filter((file) => file.startsWith(name));

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function logsJSON(type) {
  const content = fs.readFileSync(`${folder}/${name}_${type}.log`).toString().trim();
  if (!content) return [];
  return content.split('\n').map((each) => JSON.parse(each));
}

const clearLog = (type) => fs.writeFileSync(`${folder}/${name}_${type}.log`, '', () => {});

describe('Logging Tests', () => {
  beforeEach(() => {
    clearLog('all');
    clearLog('error');
  });

  test('Environment Variables', () => {
    expect(logger.level).toBe(process.env.LOG_LEVEL || 'info');
    expect(logger.defaultMeta.service).toBe(process.env.LOG_NAME || 'my-project');
    logger.transports.forEach((transport) => {
      expect(transport.dirname).toBe(process.env.LOG_PATH || 'logs/');
      expect(transport.filename).toMatch(new RegExp(`${logger.defaultMeta.service}_(all|error).log`));
    });
  });

  test('Logs are empty on init', () => {
    expect(files.length).toBe(2);
    expect(files).toContain(`${name}_all.log`);
    expect(files).toContain(`${name}_error.log`);
    expect(logsJSON('all')).toBeEmpty();
    expect(logsJSON('error')).toBeEmpty();
  });

  test('Log Errors', async () => {
    expect(logsJSON('error')).toBeEmpty();
    logger.info('This is not written as an error');
    await sleep(500);
    expect(logsJSON('error')).toBeEmpty();

    logger.error('This is an error log');
    await sleep(500);
    const errorLog = logsJSON('error');
    expect(errorLog.length).toBe(1);
    const { timestamp, ...item }  = errorLog[0];
    expect(item).toEqual({
      message: 'This is an error log',
      service: 'testing',
      level: 'error',
    });
  });

  test('Log All', async () => {
    expect(logsJSON('all')).toBeEmpty();
    expect(logsJSON('error')).toBeEmpty();
    logger.debug('This is a debug log');
    await sleep(500);
    expect(logsJSON('all')).not.toBeEmpty();
    expect(logsJSON('error')).toBeEmpty();

    const log = logsJSON('all');
    expect(log.length).toBe(1);
    const { timestamp, ...item }  = log[0];
    expect(item).toEqual({
      message: 'This is a debug log',
      service: 'testing',
      level: 'debug',
    });
  });
});
