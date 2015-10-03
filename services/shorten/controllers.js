'use strict';

const shortid = require('shortid');
const controllers = {};

controllers.shorten = {
  description: 'Shorten',
  tags: ['shorten'],
  handler: function (request, reply) {

    const qSelect = 'SELECT short FROM shorts WHERE url = \'' + request.query.url + '\'';
    const db = this.db;
    const base = this.config.base;

    request.log(['info'], request.query.url);
    db.query(qSelect, function (err, result) {

      let sid = shortid.generate();
      request.log(['info'], 'query [' + qSelect + '] == ' + result.rowCount);

      if (result.rowCount > 0) {
        sid = result.rows[0].short;
        request.log(['info'], 'url found, short = [' + sid + ']');
      } else {
        const qInsert = 'INSERT INTO shorts (short, url) VALUES (\'' + sid + '\', \'' + request.query.url + '\')';

        db.query(qInsert, function insertError (err) {

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
