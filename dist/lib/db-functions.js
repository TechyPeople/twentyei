"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.updateCounter = exports.currentCount = exports.threadExists = exports.isEligible = exports.updateContext = exports.createThreadDoc = exports.getThreadInfo = undefined;

var _firebaseAdmin = require("firebase-admin");

var admin = _interopRequireWildcard(_firebaseAdmin);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            * Created by sanil on 11/19/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            */

// Firebase initialization
var serviceAccount = require("../private/serviceAccountKey");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://twentyei-1489348155811.firebaseio.com"
});
var db = admin.firestore();

/**
 * Gets database information for a thread from Firebase.
 *
 * @param threadID Thread ID number
 * @returns {Promise.<T>}
 */
var getThreadInfo = exports.getThreadInfo = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(threadID) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return db.collection('chats').doc(threadID).get().then(function () {
                            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(doc) {
                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                        switch (_context.prev = _context.next) {
                                            case 0:
                                                if (doc.exists) {
                                                    _context.next = 4;
                                                    break;
                                                }

                                                return _context.abrupt("return", false);

                                            case 4:
                                                return _context.abrupt("return", doc.data());

                                            case 5:
                                            case "end":
                                                return _context.stop();
                                        }
                                    }
                                }, _callee, undefined);
                            }));

                            return function (_x2) {
                                return _ref2.apply(this, arguments);
                            };
                        }()).catch(function (err) {
                            return new Error("Error getting document: " + err);
                        });

                    case 2:
                        return _context2.abrupt("return", _context2.sent);

                    case 3:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getThreadInfo(_x) {
        return _ref.apply(this, arguments);
    };
}();

/**
 * Initializes a document for threads in Firebase.
 *
 * @param threadID Thread ID number
 * @param isGroup Boolean indicating whether thread is group
 */
var createThreadDoc = exports.createThreadDoc = function createThreadDoc(threadID, isGroup) {
    var data = {
        version: 1,
        context: "",
        group: isGroup,
        eligible: [true, true, true, true, true, true, true, true, true, true]
    };

    var setDoc = db.collection('chats').doc(threadID).set(data);
};

/**
 * Updates context for Cleverbot.
 *
 * @param threadID
 * @param updatedContext
 */
var updateContext = exports.updateContext = function updateContext(threadID, updatedContext) {
    var data = {
        context: updatedContext
    };

    var setDoc = db.collection('chats').doc(threadID).set(data, { merge: true });
};

/**
 * Check if a thread has a command enabled.
 *
 * @param cmd Command to check
 * @param threadID Thread ID number
 * @returns {Promise.<TResult>}
 */
var isEligible = exports.isEligible = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cmd, threadID) {
        var code, commands;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        code = void 0;
                        commands = ['add', 'kick', 'spotify', 'emoji', 'color', 'giphy', 'title', 'roast', 'pup', 'bot'];


                        code = commands.indexOf(cmd);

                        return _context3.abrupt("return", getThreadInfo(threadID).then(function (threadInfo) {
                            return !!threadInfo.eligible[code];
                        }));

                    case 4:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function isEligible(_x3, _x4) {
        return _ref3.apply(this, arguments);
    };
}();

/**
 * Check if thread exists.
 *
 * @param threadID
 * @returns {Promise.<void>}
 */
var threadExists = exports.threadExists = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(threadID) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        getThreadInfo(threadID).then(function (threadInfo) {
                            return threadInfo !== false;
                        });

                    case 1:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function threadExists(_x5) {
        return _ref4.apply(this, arguments);
    };
}();

/**
 * Get current count.
 * @returns {Promise}
 */
var currentCount = exports.currentCount = function currentCount() {
    return new Promise(function (resolve, reject) {
        db.collection('meta').doc('info').get().then(function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(doc) {
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                resolve(doc.data().numberOfMessages);

                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, undefined);
            }));

            return function (_x6) {
                return _ref5.apply(this, arguments);
            };
        }()).catch(function (err) {
            reject(new Error("Error getting count: " + err));
        });
    });
};

/**
 * Increments counter.
 */
var updateCounter = exports.updateCounter = function updateCounter() {
    currentCount().then(function (count) {
        var data = {
            numberOfMessages: count + 1
        };

        var setDoc = db.collection('meta').doc('info').set(data, { merge: true });
    });
};
//# sourceMappingURL=db-functions.js.map