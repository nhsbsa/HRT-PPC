const NHSPrototypeKit = require('nhsuk-prototype-kit')

// External dependencies
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const express = require('express');
const nunjucks = require('nunjucks');
const sessionInCookie = require('client-sessions');
const sessionInMemory = require('express-session');

// Run before other code to make sure variables from .env are available
dotenv.config();

// Local dependencies
const config = require('./app/config')
const sessionDataDefaults = require('./app/data/session-data-defaults')
const filters = require('./app/filters')
const locals = require('./app/locals')
const routes = require('./app/routes')

const viewsPath = [
  'app/views/'
]

const entryPoints = [
  'app/assets/sass/main.scss',
  'app/assets/javascript/*.js'
]

async function init() {
  const prototype = await NHSPrototypeKit.init({
    serviceName: config.serviceName,
    buildOptions: {
      entryPoints
    },
    viewsPath,
    routes,
    locals,
    filters,
    sessionDataDefaults
  })

  prototype.start(config.port)
}

init()
