"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
const axios_1 = require("axios");
const child_process_1 = require("child_process");
const fs = require("fs");
const os = require("os");
const path = require("path");
class Package {
    //Parses to send to correct handler
    //sets type, owner, repo
    //calls handler
    constructor(InputUrl, gitToken) {
        //metrics
        //license
        this.LicenseScore = 0;
        this.LicenseName = '';
        this.BusFactorScore = 0;
        this.CorrectnessScore = 0;
        this.RampUpScore = 0;
        this.MaintenanceScore = 0;
        this.Netscore = 0; //final score
        //Regex for github and npm
        this.githubRegex = /^https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
        this.npmRegex = /^https?:\/\/(?:www\.)?npmjs\.com\/package\/[^/]+\/?$/;
        //Pulled Data
        this.RepositoryData = null;
        this.githubRepositoryLicense = null;
        this.githubToken = gitToken;
        this.url = InputUrl;
        //parsing to get type, owner, repo
        if (this.githubRegex.test(InputUrl)) {
            this.type = "github";
            const parts = InputUrl.split('/');
            this.repo = parts[parts.length - 1]; // GitHub Repo Name
            this.owner = parts[parts.length - 2]; // GitHub Username
        }
        else if (this.npmRegex.test(InputUrl)) {
            this.type = "npm";
            const parts = InputUrl.split('/');
            this.repo = parts[parts.length - 1]; // GitHub Repo Name
            this.owner = parts[parts.length - 2]; // GitHub Username
        }
        else {
            this.type = "unknown";
            this.owner = "unknown";
            this.repo = "unknown";
        }
        if (this.type == "github") {
            this.Clone_Repo(this.owner, this.repo);
        }
        else if (this.type == "npm") {
            this.Npm_Handler(this.repo);
        }
        else {
            console.log("Invalid URL");
        }
    }
    Clone_Repo(owner, repo) {
        //potentially put in constructor
        // put cloning here
        const temp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-temp-dir'));
        (0, child_process_1.execSync)(`git clone https://github.com/${owner}/${repo}.git`, {
            cwd: temp_dir,
            stdio: 'inherit', // Redirect child process' stdio to the parent
        });
        //testing liceense fetch 
        //await this.License(this.owner, this.repo);
        console.log("Github Repository URL");
        return temp_dir;
    }
    Delete_Repo(temp_dir) {
        fs.rmdirSync(temp_dir, { recursive: true });
    }
    Npm_Handler(packageName) {
        //potentially put in constructor
        // put cloning here
        console.log("NPM Repository URL");
    }
    //modify as needed for each metric
    Score() {
        this.License(this.owner, this.repo);
        this.BusFactorScore = this.Bus_Factor();
        //this.CorrectnessScore = this.Correctness(); 
        //this.RampUpScore = this.RampUp();
        //this.MaintenanceScore = this.Maintenance();
        //temp calculation DO NOT USE IN FINAL
        this.Netscore = (this.LicenseScore + this.BusFactorScore + this.CorrectnessScore + +this.RampUpScore + this.MaintenanceScore) / 5;
    }
    async License(owner, repo) {
        this.LicenseScore = 0;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/license`;
        try {
            const response = await axios_1.default.get(apiUrl, {
                headers: {
                    Authorization: `Bearer ${this.githubToken}`,
                },
            });
            if (response.status === 200) {
                //log(response.data);
                //console.log(response.data);
                this.data = response.data;
                if (this.data && this.data.license.name) {
                    this.LicenseName = this.data.license.name; // Store the license
                    this.LicenseScore = 1;
                }
                else {
                    this.LicenseName = 'License information not found';
                }
            }
            else {
                this.LicenseName = 'GitHub API request failed with status: ' + response.status;
            }
        }
        catch (error) {
            this.LicenseName = 'Error while making the GitHub API request: ' + error.message;
        }
        //implement npm version
    }
    Bus_Factor() {
        return 0;
    }
    Correctness() {
        return 0;
    }
    RampUp() {
        return 0;
    }
    Maintenance() {
        return 0;
    }
}
exports.Package = Package;
async function main() {
    const IURL = "https://github.com/yoheinakajima/instagraph";
    const GIT_TOKEN = 'GIT_TOKEN';
    const test = new Package(IURL, GIT_TOKEN);
    console.log(test.owner);
    console.log(test.repo);
    // Wait for the API call to complete
    await test.License(test.owner, test.repo);
    // repository gets cloned in constructor
    // need to delete repo after running each metric
    // Now you can log LicenseName
    console.log(test.LicenseName);
}
main();
