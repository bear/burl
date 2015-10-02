var controllers = {};

controllers.status = {
    description: 'Service status',
    tags: ['status'],
    handler: function (request, reply) {

        return reply(this.config);
    }
};

module.exports = controllers;
