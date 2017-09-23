'use strict';

var _fastify = require('fastify');

var _fastify2 = _interopRequireDefault(_fastify);

var _schemas = require('./schemas');

var _schemas2 = _interopRequireDefault(_schemas);

var _v = require('./routes/v1');

var _v2 = _interopRequireDefault(_v);

var _split = require('split2');

var _split2 = _interopRequireDefault(_split);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stream = (0, _split2.default)(JSON.parse);

var fastify = (0, _fastify2.default)({
    logger: {
        level: 'info',
        stream: stream
    }
});

var opts = {
    schema: _schemas2.default
};

var shared = {
    db: 'xxx'
};

fastify.decorateRequest('verifyAuthentication', function () {
    this.isLoggedIn = true;
});

fastify.decorate('util', function (req, key, value) {
    req[key] = value;
});

fastify.decorate('random', function () {
    return Math.random() * 1000;
});

fastify.addHook('preHandler', function (req, reply, done) {
    // este código executa a cada requisição, indistintamente

    // req.verifyAuthentication();    
    // setTimeout(done,1000);
    done();
});

fastify.register(_v2.default, { prefix: '/v1' });

fastify.listen(3000, function (err) {
    if (err) throw err;
    console.log('Running at %s', fastify.server.address().port);
});