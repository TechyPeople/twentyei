"use strict";

var _dbFunctions = require("./lib/db-functions");

var db = _interopRequireWildcard(_dbFunctions);

var _twentyei = require("./lib/twentyei");

var twentyei = _interopRequireWildcard(_twentyei);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * Twentyei v2 (re-written from scratch!)
 * Created by Sanil Chawla on 11/18/17.
 * ===
 * Execute "login.js" before running this script.
 */

var fs = require('fs');
var login = require("facebook-chat-api");

/**
 * Facebook login information
 * @type {{email: *, password: *}}
 */
var loginOptions = {
    appState: JSON.parse(fs.readFileSync('./private/appState.json', 'utf8'))
};

login(loginOptions, function (err, chat) {
    if (err) return console.error(err);

    // Write new appState
    fs.writeFileSync('./private/appState.json', JSON.stringify(chat.getAppState()));

    chat.setOptions({
        listenEvents: true,
        logLevel: "verbose",
        updatePresence: true
    });

    chat.listen(function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err, message) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            db.updateCounter();

                            if (message.type === "message") {
                                // Add thread to Firebase if not already present
                                db.threadExists(message.threadID).then(function (exists) {
                                    if (!exists) {
                                        chat.getThreadInfo(message.threadID, function (err, info) {
                                            var isGroup = !info.isCanonical;
                                            db.createThreadDoc(message.threadID, isGroup);
                                        });

                                        chat.sendMessage("Hi there! I'm Twentyei, and I'm here to make this chat more useful and fun. Tag me (@Twentyei) and send a message to chat with me!");
                                    }
                                });

                                // Check if Twentyei has been mentioned
                                if (message.mentions[100011665261574] === twentyei.botName) {
                                    chat.sendTypingIndicator(message.threadID, function () {
                                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(err) {
                                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                                while (1) {
                                                    switch (_context.prev = _context.next) {
                                                        case 0:
                                                            _context.next = 2;
                                                            return twentyei.process(chat, message);

                                                        case 2:
                                                        case "end":
                                                            return _context.stop();
                                                    }
                                                }
                                            }, _callee, undefined);
                                        }));

                                        return function (_x3) {
                                            return _ref2.apply(this, arguments);
                                        };
                                    }());
                                }
                            }

                        case 2:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }());
});
//# sourceMappingURL=index.js.map