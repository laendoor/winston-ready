# Winston Ready

[![Build Status](https://travis-ci.org/leandrojdl/winston-ready.svg?branch=master)](https://travis-ci.org/leandrojdl/winston-ready)
[![Dependencies](https://img.shields.io/david/leandrojdl/winston-ready.svg)](https://david-dm.org/leandrojdl/winston-ready)
[![Coverage Status](https://coveralls.io/repos/github/leandrojdl/winston-ready/badge.svg?branch=master)](https://coveralls.io/github/leandrojdl/winston-ready?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/e87719fa91b4f8d83340/maintainability)](https://codeclimate.com/github/leandrojdl/winston-ready/maintainability)

[![NPM](https://nodei.co/npm/winston-ready.png)](https://nodei.co/npm/winston-ready/)

This is a ready-to-use [winston logger][winston] and [winston-daily-rotate-file][winston-daily-rotate-file] with the default configuration.

> ## Motivation
>
> Almost every time I start a new _Node.js_ project usually I need a logger. So I go to a previous
> project and copy `logger.js` definition with all my transports and configurations.
> I don't like to keep a lot of copies of the same code over and over.
> I create this library to avoid that.

**About this ready-to-use default configurations:**

All definitions, transports and configurations were chosen for my personal preference and workflow.

You could customize this logger adding your own transports, but if you
need a considerable different configuration you should use [winston][winston] and define at your own.

## Installation

```sh
npm install winston-ready
```

## Basic Usage

```js
const logger = require('winston-ready');

logger.error("Show me the money!");
```

## Configuration

This package is configured using (optional) environment variables:

* `LOG_NAME` (default _app_)
* `LOG_STYLE` (posible values: _single_, _rotate_, _both_, _none_; default _rotate_)
* `LOG_LEVEL` (default _info_)
* `LOG_PATH` (default _logs/_)
* `LOG_DAYS` (default _180d_)
* `LOG_DATE_PATTERN` (default _YYYY-MM-DD_)
* `LOG_CONSOLE` (default _on_)
* `LOG_CONSOLE_LEVEL` (default _debug_)

With `LOG_STYLE` you can define logging as daily _rotate_ files, just a _single_ one or _both_.
If you set it as _none_ then no logging strategy is defined and you can set you owns transports.

`LOG_LEVEL` and `LOG_CONSOLE_LEVEL` use common [npm level values][levels].

If you set `NODE_ENV=development` or `LOG_CONSOLE=on` logger will display information at console.
Otherwise only at files. It is recommended that you **turn off** `LOG_CONSOLE` on **production**.

## Extended Usage (replacing default)

```js
// my-logger.js
process.env.LOG_STYLE = 'none';
const { container, winston } = require('winston-ready/container');

container.add('my-own', {
  level: 'warn',
  format: winston.format.json(),
  transports: [new winston.transports.File({ filename: 'my-own.log' })],
});

module.exports = container.get('my-own');
```

```js
// your-module.js
const logger = require('./my-logger');

logger.error("This is my own logger error!");
```

## Extended Usage (adding another container)

```js
// my-logger.js
const { container, winston } = require('winston-ready/container');

container.add('morgan', {
  level: 'verbose',
  transports: [
    new winston.transports.File({
      filename: 'access.log',
      format: winston.format.json()
    })],
});

module.exports = {
  logger: container.get('default'),
  morgan: container.get('morgan'),
};
```

```js
// your-module.js
const { logger, morgan } = require('./my-logger');

logger.error("Show me the money!");
morgan.info("HTTP access");
```

## LICENSE

[ISC](LICENSE.md)

[winston]: https://github.com/winstonjs/winston
[levels]: https://github.com/winstonjs/winston#logging-levels
[winston-daily-rotate-file]: https://github.com/winstonjs/winston-daily-rotate-file
