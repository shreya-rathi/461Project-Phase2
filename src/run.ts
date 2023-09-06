#!/usr/bin/env node

import { program } from "commander";
import { installCommand } from './commands/install';
import { urlFileCommand } from './commands/urlFile';
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