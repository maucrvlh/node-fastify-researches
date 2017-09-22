'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var proceed = function proceed() {
    return new _promise2.default(function (resolve) {
        setTimeout(resolve, 2000, { 'step': 'proceeded' });
    });
};

var execute = function execute() {
    return new _promise2.default(function (resolve) {
        setTimeout(resolve, 2000, { 'step': 'executed' });
    });
};

var result = function result(_result) {
    return new _promise2.default(function (resolve) {
        setTimeout(resolve, 2000, { 'success': _result.step });
    });
};

exports.default = {
    getList: function getList(request, reply) {
        reply.send({ modo: 'controller importado' });
    },
    withLogging: function withLogging(request, reply) {
        request.log.info('get no /log. :)');
        reply.send({ modo: 'with logging' });
    },
    promise: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(request, reply) {
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return new _promise2.default(function (resolve) {
                                setTimeout(resolve, 2000, { mode: 'promise' });
                            });

                        case 2:
                            return _context.abrupt('return', _context.sent);

                        case 3:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function promise(_x, _x2) {
            return _ref.apply(this, arguments);
        }

        return promise;
    }(),
    chained: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(request, reply) {
            var executionResult, finalResult;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.next = 2;
                            return proceed();

                        case 2:
                            _context2.next = 4;
                            return execute();

                        case 4:
                            executionResult = _context2.sent;
                            _context2.next = 7;
                            return result(executionResult);

                        case 7:
                            finalResult = _context2.sent;
                            return _context2.abrupt('return', finalResult);

                        case 9:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function chained(_x3, _x4) {
            return _ref2.apply(this, arguments);
        }

        return chained;
    }(),
    decorate: function decorate(request, reply) {
        reply.send(fastify.random);
    }
};