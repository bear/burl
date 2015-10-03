'use strict';

const Code = require('code');
const Lab = require('lab');
const config = require('getconfig');
const server = require('../').getServer();

let lab = exports.lab = Lab.script();

lab.experiment('status', function () {

  lab.before(function (done) {

    return server.start(done);
  });

  lab.test('get', function (done) {

    let options = {
      method: 'GET', url: '/status'
    };
    server.inject(options, function (response) {

      const payload = JSON.parse(response.payload);
      Code.expect(response.statusCode).to.equal(200);
      Code.expect(payload).to.deep.equal(config.status);
      done();
    });
  });
});
