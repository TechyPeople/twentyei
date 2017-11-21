'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.process = exports.botName = undefined;

var _dbFunctions = require('./db-functions');

var db = _interopRequireWildcard(_dbFunctions);

var _cleverbot = require('./cleverbot');

var bot = _interopRequireWildcard(_cleverbot);

var _music = require('./music');

var music = _interopRequireWildcard(_music);

var _giphy = require('./giphy');

var gif = _interopRequireWildcard(_giphy);

var _insults = require('./insults');

var insults = _interopRequireWildcard(_insults);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by sanil on 11/19/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

var botName = exports.botName = '@Twentyei Chawla';

var process = exports.process = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(chat, message) {
        var query, cmd, action;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        query = message.body.toLowerCase().slice(message.body.indexOf(botName) + 17);
                        cmd = query.indexOf(" ") >= 0 ? query.slice(0, query.indexOf(" ")) : query;
                        action = query.slice(query.indexOf(cmd) + cmd.length + 1);


                        console.log("Message received!");
                        console.log("Query: " + query);
                        console.log("Command: " + cmd);
                        console.log("Action: " + action);

                        _context.next = 9;
                        return db.isEligible(cmd, message.threadID);

                    case 9:
                        if (!_context.sent) {
                            _context.next = 49;
                            break;
                        }

                        _context.t0 = cmd;
                        _context.next = _context.t0 === 'add' ? 13 : _context.t0 === 'kick' ? 15 : _context.t0 === 'spotify' ? 17 : _context.t0 === 'emoji' ? 24 : _context.t0 === 'color' ? 26 : _context.t0 === 'giphy' ? 28 : _context.t0 === 'title' ? 35 : _context.t0 === 'roast' ? 37 : _context.t0 === 'pup' ? 39 : 46;
                        break;

                    case 13:
                        chat.getUserID(action, function (err, data) {
                            if (err) chat.sendMessage("There was an error: " + err, message.threadID);else chat.addUserToGroup(data[0].userID, message.threadID);
                        });
                        return _context.abrupt('break', 47);

                    case 15:
                        chat.getUserID(action, function (err, data) {
                            if (err) chat.sendMessage("There was an error: " + err, message.threadID);else chat.removeUserFromGroup(data[0].userID, message.threadID);
                        });
                        return _context.abrupt('break', 47);

                    case 17:
                        _context.t1 = chat;
                        _context.next = 20;
                        return music.spotify(action);

                    case 20:
                        _context.t2 = _context.sent;
                        _context.t3 = message.threadID;

                        _context.t1.sendMessage.call(_context.t1, _context.t2, _context.t3);

                        return _context.abrupt('break', 47);

                    case 24:
                        chat.changeThreadEmoji(action, message.threadID, function (err) {
                            if (err) chat.sendMessage("There was an error: " + err, message.threadID);
                        });
                        return _context.abrupt('break', 47);

                    case 26:
                        chat.sendMessage("Changing the thread color isn't supported at this time. Sorry!", message.threadID);
                        return _context.abrupt('break', 47);

                    case 28:
                        _context.t4 = chat;
                        _context.next = 31;
                        return gif.search(action);

                    case 31:
                        _context.t5 = _context.sent;
                        _context.t6 = message.threadID;

                        _context.t4.sendMessage.call(_context.t4, _context.t5, _context.t6);

                        return _context.abrupt('break', 47);

                    case 35:
                        chat.setTitle(action, message.threadID);
                        return _context.abrupt('break', 47);

                    case 37:
                        chat.sendMessage(insults.generate(), message.threadID);
                        return _context.abrupt('break', 47);

                    case 39:
                        _context.t7 = chat;
                        _context.next = 42;
                        return gif.search("cute puppy");

                    case 42:
                        _context.t8 = _context.sent;
                        _context.t9 = message.threadID;

                        _context.t7.sendMessage.call(_context.t7, _context.t8, _context.t9);

                        return _context.abrupt('break', 47);

                    case 46:
                        return _context.abrupt('return', 'Error');

                    case 47:
                        _context.next = 50;
                        break;

                    case 49:
                        bot.ask(query, message.threadID).then(function (response) {
                            chat.sendMessage(response, message.threadID);
                        });

                    case 50:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function process(_x, _x2) {
        return _ref.apply(this, arguments);
    };
}();
//# sourceMappingURL=twentyei.js.map