#!/usr/bin/env node

import { program } from "commander";
import { exec } from "child_process";
import { installCommand } from './commands/install';
import { urlFileCommand } from './commands/urlfile';
import { testCommand } from './commands/test';
import { Package } from './package';
import { NPM_handler } from "./handlers";
import { readFileSync } from "fs";
import { url_handler } from './url_handler';
import {create_packages, score_packages, output_scores} from './commands/urlfile';
const figlet = require("figlet");
console.log(figlet.textSync("Package Management Rating System"));

program
    .version("0.0.1")
    .description("CLI for package management rating system");

program.addCommand(installCommand());
program
    .arguments('<filePath>')
    .description("Parses a file of URLs and return the metrics for each URL")
    .action((filePath) => {

        try {
            const fileContent = readFileSync("filePath", "utf-8");
            const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);

            urls.forEach(url => { 
                url_handler(url);
            })
          
          // place urls into list
          
           //We have the file of URLs passed in through the command line
            let pkgs = create_packages(urls); 
            let scores = score_packages(pkgs); // returns json with format {"url": Score} 
          
                // output_scores(scores);


        } catch (error) {
            console.log(error);
            process.exit(1);
        }
    })


//program.addCommand(urlFileCommand());
program.addCommand(testCommand());

program.parse(process.argv);

//const mv_dir = exec('cp dist/run.js dist/run');
//const executable = exec('chmod +x dist/run');
//const npm_build = exec('npm run build');
//const npm_start = exec('npm start');

