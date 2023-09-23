"use strict";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/07/2023
// Author: Ethan Burmane
// Description: File to handle url input from command line
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Object.defineProperty(exports, "__esModule", { value: true });
exports.npm_handler = exports.github_handler = exports.url_handler = void 0;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Output: none
// Associated: github_handler, npm_handler
// Description: This function will take in a url and determine the correct handler to send it to
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function url_handler(repo_url) {
    // creating regex to match github and npm urls
    let github_regex = /^(?:https:\/\/)?(github\.com\/|git@github\.com:)([A-Za-z0-9_.-])+\/([A-Za-z0-9_.-]+)(?:\.git)?$/;
    let npm_regex = /^(?:https:\/\/www\.)?npmjs\.com\/package\/([^/]+)/;
    // matching url to regex
    const github_match = repo_url.match(github_regex);
    const npm_match = repo_url.match(npm_regex);
    // sending url to correct handler
    if (github_match) {
        github_handler(repo_url);
    }
    else if (npm_match) {
        npm_handler(repo_url);
    }
    else {
        console.log("Invalid URL");
    }
}
exports.url_handler = url_handler;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Output: none
// Associated: url_handler
// Description: This function will take in a github url
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function github_handler(repo_url) {
}
exports.github_handler = github_handler;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Output: none
// Associated: url_handler
// Description: This function will take in a npm url
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
function npm_handler(repo_url) {
}
exports.npm_handler = npm_handler;
