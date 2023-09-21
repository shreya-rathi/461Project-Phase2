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
const transports: any = {};
logLevels.forEach((level) => {
  transports[level] = pino.destination({
    dest: `${logDirectory}/${level}.log`, // Set the file path for each log level
    level, // Set the log level for this transport stream
  });
});

// Create the Pino logger instance with the transports
const logger = pino({
  levels: {
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60
  },
  formatters: {
    level: (label: string) => ({ level: label }), // Include the log level in the output
  },
  transports: transports,
});

