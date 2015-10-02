var shortid = require('shortid');
var controllers = {};

controllers.burl = {
    description: 'burl',
    tags: ['burl'],
    handler: function (request, reply) {

        request.log(['info'], 'request [' + request.params.id + ']');
        
        this.db.query("SELECT url FROM shorts WHERE short = '" + request.params.id + "'", 
                             function insertError(err, result) {
                                if (err) {
                                    request.log(['error'], err);
                                    return reply('not found ' + request.params.id).code(404);
                                } else {
                                    return reply.redirect(result.rows[0].url);
                                };
                             });
    }
};

module.exports = controllers;
