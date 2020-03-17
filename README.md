[![Build Status](https://travis-ci.org/leandrojdl/winston-ready.svg?branch=master)](https://travis-ci.org/leandrojdl/winston-ready)
[![Coverage Status](https://coveralls.io/repos/github/leandrojdl/winston-ready/badge.svg?branch=master)](https://coveralls.io/github/leandrojdl/winston-ready?branch=master)

# Winston Ready

This is a ready-to-use [Winston logger](https://github.com/winstonjs/winston) with default configuration.

> **Motivation**
> 
> Sometimes you have a few projects and you want to keep consistency between them.
> Maybe you are tired of copy & paste the same logger configuration over and over.
> This is how this project was born, to avoid repeat myself on every node project.

**About this ready-to-use default configurations:**

All definitions and transports configurations were chosen for personal taste, nothing else.

If you are not agree with them is preferable that you use `winston` and make your own configuration.

## Installation

```sh
npm install winston-ready
```

## Usage

```js
const logger = require('logger');

logger.error("Show me the money!");
```

## Configuration

This package is configured using (optional) environments variables:

* LOG_LEVEL (default _info_)
* LOG_PATH (default _logs/_)
* LOG_NAME (default _my-project_)
* DEV_LOG_LEVEL (only for Console transport, default _LOG\_LEVEL_ || _debug_)
