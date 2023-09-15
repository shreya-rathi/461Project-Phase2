// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/15/2023
// Author: Andrew Kreimer
// Description: This file will take in a url and determine the correct handler to send it to
// Actions: Link to CLI call
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
import axios from 'axios';
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Parameters: repo_url: string
// Function: github_handler
// Associated: github_handler, npm_handler
// Description: This function will take in a url and determine the correct handler to send it to
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
class UrlHandler { 
  private githubRegex: RegExp;
  private npmRegex: RegExp;
  private token: string;
  public urlList: string[] = []; //list of unmatched urls

  
  constructor(token: string) {
    //regex for github url and npm url
    this.githubRegex = /^https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    //this.githubRegex = /^(?:https:\/\/)?(github\.com\/|git@github\.com:)([A-Za-z0-9_.-])+\/([A-Za-z0-9_.-]+)(?:\.git)?$/;
    this.npmRegex = /^https?:\/\/(?:www\.)?npmjs\.com\/package\/[^/]+\/?$/;
    //this.npmRegex = /^(?:https:\/\/www\.)?npmjs\.com\/package\/([^/]+)/;
    this.token = token;
  }

  private async github_handler(url:string) {
    const repo = url.split('/')[2] // Github Repo Name
    const owner = url.split('/')[1] // Github Username
    try {
      const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      });
  
      if (response.status === 200) {
        const repositoryData = response.data;
        console.log(repositoryData);
      } else {
        console.error(`GitHub API request failed with status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error while making the GitHub API request:', error);
    }
  }

  Parse(url: string) {
    if (this.githubRegex.test(url)) {
        //call github handler
        this.github_handler(url);
        console.log("Github Repository URL");
    } else if (this.npmRegex.test(url)) {
        //call npm handler
        //this.npm_handler(url);
        console.log("NPM Repository URL");  
    } else {
        //store
        this.urlList.push(url);
        console.log("Neither GitHub nor NPM Repository URL"); 
    }
    return url;
  }
}

// Test cases
const AK_token = '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'
const detector = new UrlHandler(AK_token);

const passingURLs: string[] = [
  "https://github.com/user/repo",
  "https://github.com/user/repo/",
  "http://github.com/user/repo",
  "https://npmjs.com/package/package-name",
  "https://www.npmjs.com/package/package-name",
  "http://npmjs.com/package/package-name",
  "https://www.npmjs.com/package/package-name/",
  "https://npm.pkg.github.com/user/repo",
  "https://www.npm.pkg.github.com/user/repo",
  "http://npm.pkg.github.com/user/repo",
  "https://github.com/user/repo123",
  "https://github.com/user/repo123/",
  "http://github.com/user/repo123",
  "https://npmjs.com/package/package-name123",
  "https://www.npmjs.com/package/package-name123",
  "http://npmjs.com/package/package-name123",
  "https://www.npmjs.com/package/package-name123/",
  "https://npm.pkg.github.com/user/repo123",
  "https://www.npm.pkg.github.com/user/repo123",
  "http://npm.pkg.github.com/user/repo123",
];

const failingURLs: string[] = [
  "https://example.com",
  "https://www.example.com",
  "http://example.com",
  "ftp://github.com/user/repo",
  "https://npmjs.org/package/package-name",
  "https://www.npmjs.org/package/package-name",
  "http://npmjs.org/package/package-name",
  "https://www.npmjs.org/package/package-name/",
  "https://npmjs.com",
  "https://www.npmjs.com",
  "http://npmjs.com",
  "https://github.com",
  "https://www.github.com",
  "http://github.com",
  "https://npmjs.com/package-name123",
  "https://www.npmjs.com/package-name123",
  "http://npmjs.com/package-name123",
  "https://www.npmjs.com/package-name123/",
  "https://npm.pkg.github.com",
  "https://www.npm.pkg.github.com",
  "http://npm.pkg.github.com",
  "https://github.com123",
  "https://www.github.com123",
  "http://github.com123",
  "https://npmjs.org/package/package-name123",
  "https://www.npmjs.org/package/package-name123",
  "http://npmjs.org/package/package-name123",
  "https://www.npmjs.org/package/package-name123/",
  "https://npm.pkg.github.com123",
  "https://www.npm.pkg.github.com123",
  "http://npm.pkg.github.com123",
  "https://github.com/user/repo/extra",
  "https://npmjs.com/package/package-name/extra",
  "https://npm.pkg.github.com/user/repo/extra",
  "https://example.com/user/repo",
  "https://example.com/package/package-name",
  "https://example.com/user/repo123",
  "https://example.com/package/package-name123",
  "https://example.com/user/repo/extra",
  "https://example.com/package/package-name/extra",
  "https://example.com/user/repo123/extra",
  "https://example.com/package/package-name123/extra",
];

console.log(detector.Parse("https://github.com/yoheinakajima/instagraph"));
// console.log("Passing URLs:");
// for (let i = 0; i < passingURLs.length; i++) {
//   console.log(detector.Parse(passingURLs[i]));
// }

// console.log("\nFailing URLs:");
// for (let j = 0; j < failingURLs.length; j++) {
//   console.log(detector.Parse(failingURLs[j]));
// }

// console.log("\nUnmatched URLs:");
// console.log(detector.urlList);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-