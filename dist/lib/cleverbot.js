'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ask = undefined;

var _dbFunctions = require('./db-functions');

var db = _interopRequireWildcard(_dbFunctions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by sanil on 11/19/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var CleverbotAPI = require('cleverbot-api');
var cleverbot = new CleverbotAPI('CC5iybi6FlNywj957bERFy73w4A');

var ask = exports.ask = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(query, threadID) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            db.getThreadInfo(threadID).then(function (res) {
                                cleverbot.getReply({
                                    input: query,
                                    cs: res.context
                                }, function (error, response) {
                                    if (error) return reject(error);

                                    db.updateContext(threadID, response.cs);
                                    resolve(response.output);
                                });
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function ask(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=cleverbot.js.map