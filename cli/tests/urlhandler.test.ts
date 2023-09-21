import { url_handler } from '../url_handler';  // Adjust the import path according to your project structure

describe("URLHandler Tests", () => {
    let parser: url_handler;

    beforeAll(() => {
        parser = new url_handler();
    });

    it("should extract a list of URLs", async () => {
        const URLList = await parser.getUrls();
        expect(URLList).toBeDefined();
        // Additional checks can be done on URLList such as checking length, format, etc.
    });

    it("should extract package name from npm link", async () => {
        const packageName = await parser.extractPackageNameFromLink('https://www.npmjs.com/package/browserify');
        expect(packageName).toBe("browserify");
    });

    it("should extract GitHub repo from git link", async () => {
        const githubRepo = await parser.extractGithubRepo('git+ssh://git@github.com/browserify/browserify.git');
        expect(githubRepo).toBe("browserify/browserify");
    });
});

