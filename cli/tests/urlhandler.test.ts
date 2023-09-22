// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/07/2023
// Author: Ethan Burmane
// Description: File to handle url input from command line
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { url_handler, github_handler, npm_handler } from '../src/url_handler';  // Adjust the import path according to your project structure
import { describe, it, expect} from "@jest/globals";

describe("URL_handler Tests", () => {
    /*
    it("should extract a list of URLs", async () => {
        const URLList = await parser.getUrls();
        expect(URLList).toBeDefined();
        // Additional checks can be done on URLList such as checking length, format, etc.
    });
*/

    // npm package extraction test
    it("is expected to extract the npm package", async () => {
        const packageName = url_handler('https://www.npmjs.com/package/karma');
        expect(packageName).toBe("karma");
    });

    it("is expected to extract the npm package, using the npm_handler function", async () => {
        const packageName = npm_handler('https://www.npmjs.com/package/karma');
        expect(packageName).toBe("karma");
    });

    // github repo extraction test
    it("is expected to extract the GitHub repository", async () => {
        const githubRepo = await url_handler('https://github.com/karma-runner/karma');
        expect(githubRepo).toBe("karma-runner/karma");
    });

    it("is expected to extract the GitHub repository, using the git_handler function", async () => {
        const githubRepo = await github_handler('https://github.com/karma-runner/karma');
        expect(githubRepo).toBe("karma-runner/karma");
    });

    // invalid URL Test
    it("should return an error for an invalid URL", async () => {
        const invalidURL = await url_handler('https://www.google.com/');
        expect(invalidURL).toBe("Invalid URL");
    });

});

