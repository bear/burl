'use strict';

const controllers = {};

controllers.burl = {
  description: 'burl',
  tags: ['burl'],
  handler: function (request, reply) {

    const qInsert = 'SELECT url FROM shorts WHERE short = \'' + request.params.id + '\'';
    request.log(['info'], 'request [' + request.params.id + ']');
    this.db.query(qInsert, function insertError (err, result) {

      if (err) {
        request.log(['error'], err);
        return reply('not found ' + request.params.id).code(404);
      };
      return reply.redirect(result.rows[0].url);
    });
  }
};

module.exports = controllers;
