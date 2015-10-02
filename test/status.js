var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();
var config = require('getconfig');
var server = require('../').getServer();

lab.experiment('status', function () {

    lab.before(function (done) {

        return server.start(done);
    });

    lab.test('get', function (done) {

        var options = {
            method: 'GET', url: '/status'
        };
        server.inject(options, function (response) {

            var payload = JSON.parse(response.payload);
            Code.expect(response.statusCode).to.equal(200);
            Code.expect(payload).to.deep.equal(config.status);
            done();
        });
    });
});
