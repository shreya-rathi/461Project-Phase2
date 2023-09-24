"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const pino = require("pino");
const fs = require("fs");
//Make sure log directory exists
const logDirectory = './logs';
if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
}
// Define log levels and their respective file names
const logLevels = ['info', 'warn', 'error', 'fatal'];
// Create separate transport streams for each log level
const transports = {};
logLevels.forEach((level) => {
    transports[level] = pino.destination({
        dest: `${logDirectory}/${level}.log`,
        level, // Set the log level for this transport stream
    });
});
// Create the Pino logger instance with the transports
exports.logger = pino({
    levels: {
        info: 30,
        warn: 40,
        error: 50,
        fatal: 60
    },
    formatters: {
        level: (label) => ({ level: label }), // Include the log level in the output
    },
    transports: transports,
});
//Examples
//These function all take arguments of (message: string, addtional_data: Object{})
exports.logger.info("Here is an info log", { msg: "ex: package 'pkg' scoring complete: 'score' ", timestamp: new Date() });
exports.logger.warn("Here is a warning log", { msg: "ex: using outdated version of module", module: "x", timestamp: new Date() });
exports.logger.error("Here is a error log", { msg: "ex: api response code 500 from endpoint 'github.com' ", request: "GET github.com/example", timestamp: new Date() });
exports.logger.fatal("Here is a fatal log", { msg: "ex: dependency not available", dependency: "example_dep", timestampe: new Date() });
