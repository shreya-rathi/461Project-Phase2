const pino = require("pino");
const fs = require("fs");



//Make sure log directory exists
const logDirectory = './logs';
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const filePath = process.env.LOG_FILE;

if (fs.existsSync(filePath)) {
  console.log('The file already exists.');
} else {
  // If the file does not exist, create it
  fs.writeFileSync(filePath, '', 'utf-8');
  console.log('File created successfully.');
}


const lg_level = process.env.LOG_LEVEL;
let l: number = parseInt(lg_level ?? "1", 10);
let level: string = 'info';
if (l == 0)
{
  level = 'silent';
}
else if (l == 2)
{
  level = 'debug';
}
// Create the Pino logger instance with the transports
export const logger = pino({
  level: level, // Set the default log level
  dest: filePath 
});

//Examples
//These function all take arguments of (message: string, addtional_data: Object{})

// logger.info("Here is an info log", { msg: "ex: package 'pkg' scoring complete: 'score' ", timestamp: new Date() });

// logger.warn("Here is a warning log", { msg: "ex: using outdated version of module", module: "x", timestamp: new Date() });

// logger.error("Here is a error log", { msg: "ex: api response code 500 from endpoint 'github.com' ", request: "GET github.com/example", timestamp: new Date() });

// logger.fatal("Here is a fatal log", { msg: "ex: dependency not available", dependency: "example_dep", timestampe: new Date() });
