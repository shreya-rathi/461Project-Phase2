#!/usr/bin/env node

import { program } from "commander";
import { exec } from "child_process";
import { Package } from "./PKG";
import { installCommand } from './commands/install';
import { testCommand } from './commands/test';
import { readFileSync } from "fs";
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
    .action(async(filePath) => {
        type metrics = {
            NET_SCORE: number,
            LICENSE_SCORE: number,
            CORRECTNESS_SCORE: number,
            RAMP_UP_SCORE: number,
            RESPONSIVE_MAINTAINER_SCORE: number,
            BUS_FACTOR_SCORE: number
        }
        try {
            const fileContent = readFileSync("filePath", "utf-8");
            const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
            // create a list of packages
            let packages: Package[];

            urls.forEach(url => { 
                const pckg = new Package(url, "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");
                packages.push(pckg);
            })

            let scores = score_packages(packages);
          
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

