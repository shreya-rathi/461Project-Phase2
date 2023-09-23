"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPM_api_engine = void 0;
const axios_1 = require("axios");
class NPM_api_engine {
    constructor() {
        this.metadata_host = "https://registry.npmjs.org/";
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    // Output: None
    // Associated: 
    // Description: Makes the api call for the metadata, handling errors if any occur.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    async get_metadata(pkg) {
        let endpoint = this.metadata_host + pkg.get_name();
        try {
            const response = await axios_1.default.get(endpoint);
            if (response.status == 500) {
                throw new Error(`HTTP error! Status: ${response.status}`);
                //Perform logging
            }
            return response.data;
        }
        catch (error) {
            console.error('Error:', error);
            //Perform logging
        }
    }
    get_metadata_host() { return this.metadata_host; }
}
exports.NPM_api_engine = NPM_api_engine;
class GitHub_api_engine {
    constructor() {
        this.host = "api.github.com/";
    }
    async repo_issues(owner, repo_name) {
        try {
            const response = await axios_1.default.get(this.host + "repos/" + owner + "/" + repo_name + "/issues");
            if (response.status == 200) {
                return response.data;
            }
            else {
                //Log error
            }
        }
        catch (error) {
            //Log
        }
    }
}
