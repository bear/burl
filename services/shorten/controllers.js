var shortid = require('shortid');
var controllers = {};

controllers.shorten = {
    description: 'Shorten',
    tags: ['shorten'],
    handler: function (request, reply) {

        var sid = shortid.generate();

        request.log(['info'], 'shorten for [' + request.params.url + '] [' + sid + ']');

        this.db.query('INSERT INTO shorts ("url", "short") VALUES ( "' + request.params.url + '", "' + sid + '")', 
                        function insertError(err, result) {
                            if (err) {
                                request.log(['error'], err);
                            };
                        });

        return reply(this.config.base + sid);
    }
};

module.exports = controllers;
