#!/usr/bin/env node

import { program } from "commander";
import { exec } from "child_process";
import { installCommand } from './commands/install';
import { urlFileCommand } from './commands/urlfile';
import { testCommand } from './commands/test';

//const { Command } = require("commander");
const figlet = require("figlet");
//const program = new Command();
console.log(figlet.textSync("Package Management Rating System"));

program
    .version("0.0.1")
    .description("CLI for package management rating system");

program.addCommand(installCommand());
program.addCommand(urlFileCommand());
program.addCommand(testCommand());

program.parse(process.argv);

const mv_dir = exec('mv dist/run.js dist/run');
const executable = exec('chmod +x dist/run');
//const npm_build = exec('npm run build');
//const npm_start = exec('npm start');

