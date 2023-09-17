import { NPM_api_engine } from "../api";
import { describe, it, beforeEach, expect} from "@jest/globals";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';

const metadata_response_success = `{
    "dist-tags": {
        "latest": "1.0.0"
    },
    "modified": "2015-05-16T22:27:54.741Z",
    "name": "tiny-tarball",
    "versions": {
        "1.0.0": {
            "_hasShrinkwrap": false,
            "directories": {},
            "dist": {
                "shasum": "bbf102d5ae73afe2c553295e0fb02230216f65b1",
                "tarball": "https://registry.npmjs.org/tiny-tarball/-/tiny-tarball-1.0.0.tgz"
            },
            "name": "tiny-tarball",
            "version": "1.0.0"
        }
    }
}`;

const validJsonRegex = /^(\{.*\}|\[.*\])$/;

const mockAxios = new MockAdapter(axios);
let engine = new NPM_api_engine();
describe("NPM api", () => {

    it("Engine should be able to process successful request",() =>
    {
        mockAxios.onGet(engine.get_metadata_host() + "safe-regex").reply(200, metadata_response_success);

        let response = engine.get_metadata("safe-regex");
        expect(response).toMatch(validJsonRegex);
    });

    it("Engine should be able to handler HTTP error response", () =>
    {
        mockAxios.onGet(engine.get_metadata_host() + "safe-regex").reply(500, "Internal Server Error");

        let response = engine.get_metadata("safe-regex");

        expect(response).rejects.toThrow("HTTP error! Status: 500");
    });
});