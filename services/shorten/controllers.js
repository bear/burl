var shortid = require('shortid');
var controllers = {};

controllers.shorten = {
    description: 'Shorten',
    tags: ['shorten'],
    handler: function (request, reply) {

        var sid = shortid.generate();

        return reply(this.config.base + sid);
    }
};

module.exports = controllers;
