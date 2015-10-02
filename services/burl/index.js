var Controllers = require('./controllers');

exports.register = function (plugin, options, done) {

    plugin.bind({ config: options.config });

    plugin.route({ method: 'GET', path: '/{id?}', config: Controllers.burl });
    return done();
};

exports.register.attributes = {
    name: 'burl-burl',
    version: '1.0.0'
};

