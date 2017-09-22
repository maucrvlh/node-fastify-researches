'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _usersController = require('./controllers/usersController');

var _usersController2 = _interopRequireDefault(_usersController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (fastify, options, next) {
    fastify.get('/normal', function (request, reply) {
        reply.send({ modo: 'normal' });
    });

    fastify.get('/shared', options, function (request, reply) {
        reply.send({ modo: 'shared', options: options });
    });

    fastify.get('/async', function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, reply) {
            var someAsyncData;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return new _promise2.default(function (resolve, rejct) {
                                setTimeout(resolve, 1000, { modo: "async/await" });
                            });

                        case 2:
                            someAsyncData = _context.sent;
                            return _context.abrupt('return', someAsyncData);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());

    fastify.get('/imported', _usersController2.default.getList);
    fastify.get('/log', _usersController2.default.withLogging);
    fastify.get('/promise', _usersController2.default.promise);
    fastify.get('/chained', _usersController2.default.chained);
    fastify.get('/decorate', _usersController2.default.decorate);
    next();
};