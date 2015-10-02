'use strict';

var Hapi = require('hapi');
var Hoek = require('hoek');
var config = require('getconfig');
var pg = require('pg');

var server = new Hapi.Server(config.hapi.options);

var pgClient = new pg.Client("postgres://" + config.db.connection.user + ":" + config.db.connection.password + 
                             "@" + config.db.connection.host + "/" + config.db.connection.database);

pgClient.connect(function pgConnect(err) {
    if (err) {
        server.error(['error'], 'unable to connect to database: ' + err);
    };
});

var plugins = [{
    register: require('good'),
    options: {
        reporters: [{
            reporter: require('good-console'),
            events: config.hapi.logEvents
        }]
    }
}, {
    register: require('./services/status'),
    options: { config: config.status }
}, {
    register: require('./services/shorten'),
    options: { config: config.shorten, db: pgClient }
}, {
    register: require('./services/burl'),
    options: { config: config.shorten, db: pgClient }
}];

server.connection({
    routes: {
        cors: config.hapi.cors
    },
    host: config.hapi.host,
    port: config.hapi.port
});

server.register(plugins, function (err) {
    Hoek.assert(!err, 'Failed loading plugins: ' + err);

    server.start(function (err) {
        Hoek.assert(!err, 'Failed starting service: ' + err);

        server.log(['info', 'startup'], 'Service is running at ' + server.info.uri);
    });
});

server.on('stop', function () {
    server.log(['info', 'shutdown'], 'Service has stopped');
});

exports.getServer = function () {
    return server;
};
