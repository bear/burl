'use strict';

const Controllers = require('./controllers');

exports.register = function (plugin, options, done) {

  plugin.bind({ config: options.config });
  plugin.route({ method: 'GET', path: '/status', config: Controllers.status });
  return done();
};

exports.register.attributes = {
  name: 'burl-status',
  version: '1.0.0'
};

