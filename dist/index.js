'use strict';

var _fastify = require('fastify');

var _fastify2 = _interopRequireDefault(_fastify);

var _schemas = require('./schemas');

var _schemas2 = _interopRequireDefault(_schemas);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

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

fastify.decorateRequest('verify', function () {
    this.isLoggedIn = true;
});

fastify.decorate('util', function (req, key, value) {
    req[key] = value;
});

fastify.decorate('random', function () {
    return Math.random() * 1000;
});

fastify.addHook('preHandler', function (req, reply, done) {
    // req.verify();
    fastify.util(req, 'timestamp', new Date());
    done();
});

fastify.register(_routes2.default, shared, function (err) {
    if (err) throw err;
});

fastify.listen(3000, function (err) {
    if (err) throw err;
    console.log('Running at %s', fastify.server.address().port);
});