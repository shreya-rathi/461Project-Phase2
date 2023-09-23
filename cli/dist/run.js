#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const install_1 = require("./commands/install");
const urlfile_1 = require("./commands/urlfile");
const test_1 = require("./commands/test");
//const { Command } = require("commander");
const figlet = require("figlet");
//const program = new Command();
console.log(figlet.textSync("Package Management Rating System"));
commander_1.program
    .version("0.0.1")
    .description("CLI for package management rating system");
commander_1.program.addCommand((0, install_1.installCommand)());
commander_1.program.addCommand((0, urlfile_1.urlFileCommand)());
commander_1.program.addCommand((0, test_1.testCommand)());
commander_1.program.parse(process.argv);
//const mv_dir = exec('cp dist/run.js dist/run');
//const executable = exec('chmod +x dist/run');
//const npm_build = exec('npm run build');
//const npm_start = exec('npm start');
