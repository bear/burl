var shortid = require('shortid');
var controllers = {};

controllers.shorten = {
    description: 'Shorten',
    tags: ['shorten'],
    handler: function (request, reply) {

        request.log(['info'], request.query.url);

        var qSelect = "SELECT short FROM shorts WHERE url = '" + request.query.url + "'";
        var db = this.db;
        var base = this.config.base;

        db.query(qSelect, function (err, result) {
            var sid = null;
            request.log(['info'], 'query [' + qSelect + '] == ' + result.rowCount);
            if (result.rowCount > 0) {
                sid = result.rows[0].short;
                request.log(['info'], 'url found, short = [' + sid + ']');
            } else {
                sid = shortid.generate();
                db.query("INSERT INTO shorts (short, url) VALUES ('" + sid + "', '" + request.query.url + "')", 
                            function insertError(err, result) {
                                if (err) {
                                    request.log(['error'], err);
                                };
                        });
            };
            return reply(base + sid);
        });
    }
};

module.exports = controllers;
