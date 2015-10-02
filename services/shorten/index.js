var Controllers = require('./controllers');

exports.register = function (plugin, options, done) {

    plugin.bind({ config: options.config });

    plugin.route({ method: 'GET', path: '/shorten/{url?}', config: Controllers.shorten });
    return done();
};

exports.register.attributes = {
    name: 'burl-shorten',
    version: '1.0.0'
};

