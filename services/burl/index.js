var Controllers = require('./controllers');

exports.register = function (plugin, options, done) {

    plugin.bind({ config: options.config, db: options.db  });

    plugin.route({ method: 'GET', path: '/{id?}', config: Controllers.burl });
    return done();
};

exports.register.attributes = {
    name: 'burl-burl',
    version: '1.0.0'
};

