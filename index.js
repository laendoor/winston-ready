const { container } = require('./container');

/** @constant {Logger} */
const logger = container.get('default');

module.exports = logger;
