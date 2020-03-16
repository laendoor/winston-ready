const logger = require('./index');

class LogMe {
  constructor() {
    this.foo = 'foo';
    this.bar = 42;
  }
}

logger.info('Info Message');

logger.info(new LogMe());

logger.info({
  a: 'a',
  b: {
    c: 'c',
    d: {
      e: 'e',
      f: {
        g: 'g',
      },
    },
  },
});

logger.debug([1, 2, 'tres', { cuatro: 4 }]);

logger.debug(new Error('It\'s broken!'));

logger.error(new Error('Really broken!'));
