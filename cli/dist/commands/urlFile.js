"use strict";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.1
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for parsing user input for file URL
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlFileCommand = void 0;
const commander_1 = require("commander");
const package_1 = require("../package");
const handlers_1 = require("../handlers");
const fs_1 = require("fs");
const url_handler_1 = require("../url_handler");
function urlFileCommand() {
    const urlFilePath = new commander_1.Command('URL_FILE');
    urlFilePath
        .arguments('<filePath>')
        .description("Parses a file of URLs and return the metrics for each URL")
        .action((filePath) => {
        try {
            const fileContent = (0, fs_1.readFileSync)("filePath", "utf-8");
            const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
            urls.forEach(url => {
                (0, url_handler_1.url_handler)(url);
            });
            // place urls into list
            //We have the file of URLs passed in through the command line
            let pkgs = create_packages(urls);
            let scores = score_packages(pkgs); // returns json with format {"url": Score} 
            // output_scores(scores);
        }
        catch (error) {
            console.log(error);
            process.exit(1);
        }
    });
    return urlFilePath;
}
exports.urlFileCommand = urlFileCommand;
function get_urls(file_name) {
    let urls = [];
    return urls;
}
function create_packages(urls) {
    let pkgs = [];
    for (let i = 0; i < urls.length; i++) {
        let p = new package_1.Package(urls[i]);
        pkgs.push(p);
    }
    return pkgs;
}
function score_packages(pkgs) {
    let npm_handler = new handlers_1.NPM_handler();
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
/*
function output_scores(scores: Array<Score>)
{
  scores.forEach((s) =>
    {
      s.print();
    });
}
*/ 
