#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const install_1 = require("./commands/install");
const test_1 = require("./commands/test");
const fs_1 = require("fs");
const urlfile_1 = require("./commands/urlfile");
const figlet = require("figlet");
console.log(figlet.textSync("Package Management Rating System"));
commander_1.program
    .version("0.0.1")
    .description("CLI for package management rating system");
commander_1.program.addCommand((0, install_1.installCommand)());
commander_1.program
    .arguments('<filePath>')
    .description("Parses a file of URLs and return the metrics for each URL")
    .action((filePath) => {
    try {
        const fileContent = (0, fs_1.readFileSync)("filePath", "utf-8");
        const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
        urls.forEach(url => {
            url_handler(url);
        });
        // place urls into list
        //We have the file of URLs passed in through the command line
        let pkgs = (0, urlfile_1.create_packages)(urls);
        let scores = (0, urlfile_1.score_packages)(pkgs); // returns json with format {"url": Score} 
        // output_scores(scores);
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
});
//program.addCommand(urlFileCommand());
commander_1.program.addCommand((0, test_1.testCommand)());
commander_1.program.parse(process.argv);
//const mv_dir = exec('cp dist/run.js dist/run');
//const executable = exec('chmod +x dist/run');
//const npm_build = exec('npm run build');
//const npm_start = exec('npm start');
