// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/07/2023
// Author: Ethan Burmane
// Description: File to handle url input from command line
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Output: none
// Associated: github_handler, npm_handler
// Description: This function will take in a url and determine the correct handler to send it to
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export function url_handler(repo_url: string) {

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

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Output: none
// Associated: url_handler
// Description: This function will take in a github url
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export function github_handler(repo_url: string) {

    

}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Output: none
// Associated: url_handler
// Description: This function will take in a npm url
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export function npm_handler(repo_url: string) {

}