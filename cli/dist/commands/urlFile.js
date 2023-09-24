"use strict";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.1
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for parsing user input for file URL
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Object.defineProperty(exports, "__esModule", { value: true });
exports.output_scores = exports.score_packages = exports.create_packages = exports.urlFileCommand = void 0;
const commander_1 = require("commander");
const PKG_1 = require("../PKG");
//import { NPM_handler } from "../handlers";
const fs_1 = require("fs");
function urlFileCommand() {
    //const urlFilePath = new Command();
    commander_1.program
        .arguments('<filePath>')
        .description("Parses a file of URLs and return the metrics for each URL")
        .action((filePath) => {
        try {
            const fileContent = (0, fs_1.readFileSync)("filePath", "utf-8");
            const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
            /*
                            urls.forEach(url => {
                                url_handler(url);
                            })
                          */
            // place urls into list
            //We have the file of URLs passed in through the command line
            let pkgs = create_packages(urls);
            let scores = score_packages(pkgs); // returns json with format {"url": Score} 
            output_scores(scores);
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    });
    commander_1.program.parse(process.argv);
    //return urlFilePath;
}
exports.urlFileCommand = urlFileCommand;
function get_urls(file_name) {
    let urls = [];
    return urls;
}
function create_packages(urls) {
    let pkgs = [];
    for (let i = 0; i < urls.length; i++) {
        let p = new PKG_1.Package(urls[i], "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");
        pkgs.push(p);
    }
    return pkgs;
}
exports.create_packages = create_packages;
function score_packages(pkgs) {
    let npm_handler = new NPM_handler();
    let scores = {};
    for (let i = 0; i < pkgs.length; i++) {
        if (pkgs[i].get_domain() == "npm") {
            let s = npm_handler.evaluate(pkgs[i]);
            scores[pkgs[i].get_url()] = s;
        }
        else { }
    }
    return scores;
}
exports.score_packages = score_packages;
function output_scores(scores) {
    scores.forEach((s) => {
        s.print();
    });
}
exports.output_scores = output_scores;
    * /;
