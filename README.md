# Winston Ready

[![Build Status](https://travis-ci.org/leandrojdl/winston-ready.svg?branch=master)](https://travis-ci.org/leandrojdl/winston-ready)
[![Dependencies](https://img.shields.io/david/leandrojdl/winston-ready.svg)](https://david-dm.org/leandrojdl/winston-ready)
[![Coverage Status](https://coveralls.io/repos/github/leandrojdl/winston-ready/badge.svg?branch=master)](https://coveralls.io/github/leandrojdl/winston-ready?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/e87719fa91b4f8d83340/maintainability)](https://codeclimate.com/github/leandrojdl/winston-ready/maintainability)

[![NPM](https://nodei.co/npm/winston-ready.png)](https://nodei.co/npm/winston-ready/)

This is a ready-to-use [Winston logger](https://github.com/winstonjs/winston) with the default configuration.

> ## Motivation
>
> Sometimes you have a few projects and you want to keep consistency between them.
> Maybe you are tired of copying & pasting the same logger configuration over and over.
> This project was born to avoid having to repeat this process on every new Node project.

**About this ready-to-use default configurations:**

All definitions and transport configurations were chosen for my personal preference and workflow.

If they don't suit you, you should use winston and define your custom configuration.

## Installation

```sh
npm install winston-ready
```

## Usage

```js
const logger = require('winston-ready');

logger.error("Show me the money!");
```

## Configuration

This package is configured using (optional) environment variables:

* `LOG_LEVEL` (default _info_)
* `LOG_PATH` (default _logs/_)
* `LOG_NAME` (default _my-project_)
* `DEV_LOG_LEVEL` (only for Console transport, default _LOG\_LEVEL_ || _debug_)
