var shortid = require('shortid');
var controllers = {};

controllers.burl = {
    description: 'burl',
    tags: ['burl'],
    handler: function (request, reply) {

        request.log(['info'], 'fetch request for [' + request.params.id + ']');
        
        this.config.pg.query('SELECT FROM shorts url WHERE short = "' + request.params.id + '"', 
                             function insertError(err, result) {
                                if (err) {
                                    request.log(['error'], err);
                                } else {
                                    return reply(result.rows[0].url);
                                };
                             });

        return reply('not found ' + request.params.id).code(404);
    }
};

module.exports = controllers;
