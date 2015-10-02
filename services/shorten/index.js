var Controllers = require('./controllers');

exports.register = function (plugin, options, done) {

    plugin.bind({ config: options.config, db: options.db });

    plugin.route({ method: 'GET', path: '/shorten', config: Controllers.shorten });
    return done();
};

exports.register.attributes = {
    name: 'burl-shorten',
    version: '1.0.0'
};

