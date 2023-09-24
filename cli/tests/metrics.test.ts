// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: Tests for metrics.ts
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { describe, it, expect } from "@jest/globals";
//import { Score } from "../evaluator";
import { RampUp, Correctness, BusFactor, ResponsiveMaintainer, License, NetScore } from '../src/metrics'; 
import { Package } from "../src/PKG";

// Tests for BusFactor, Responsiveness, RampUp, Correctness, LicenseCompatibility, NetScore
describe("Correctness", () => {
    it("is expected to return the Correctness score", async () => {
        const correctness_score = new Correctness();
        const pckg = new Package("https://www.npmjs.com/package/karma", "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");
        const score = await correctness_score.score(pckg); 
        expect(score).toBeDefined(); // checks that score is not null
        expect(correctness_score.get_name()).toBe("CORRECTNESS_SCORE"); // maybe changed to correctness_score.get_name(), to use the function
        expect(score).toBeGreaterThan(0);  // checks that score is greater than 0
    });
});

describe("BusFactor", () => {
    it("is expected to return the Bus Factor score", async () => {
        const bus_factor_score = new BusFactor();
        const pckg = new Package("https://www.npmjs.com/package/karma", "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");
        const score = await bus_factor_score.score(pckg); 
        expect(score).toBeDefined(); 
        expect(bus_factor_score.get_name()).toBe("BUS_FACTOR_SCORE");
        expect(score).toBeGreaterThan(0);
    });
});

describe("LicenseCompatibility", () => {
    it("is expected to return the License Compatibility score", async () => {
        const license_score = new License();
        const pckg = new Package("https://www.npmjs.com/package/karma", "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");
        const score = await license_score.score(pckg);
        expect(score).toBeDefined();
        expect(license_score.get_name()).toBe("LICENSE_SCORE");
        expect(score).toBeGreaterThan(0);
    });
});

describe("Ramp-Up", () => {
    it("is expected to return the Ramp-Up Time score", async () => {
        const ramp_up_score = new RampUp();
        const pckg = new Package("https://www.npmjs.com/package/karma", "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");
        const score = await ramp_up_score.score(pckg);
        expect(score).toBeDefined();
        expect(ramp_up_score.get_name()).toBe("RAMP_UP_SCORE");
        expect(score).toBeGreaterThan(0);
    });
});

describe("Responsiveness", () => {
    it("is expected to return the Responsiveness score", async () => {
        const responsiveness_score = new ResponsiveMaintainer();
        const pckg = new Package("https://www.npmjs.com/package/karma", "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");
        const score = await responsiveness_score.score(pckg);
        expect(score).toBeDefined();
        expect(responsiveness_score.get_name()).toBe("RESPONSIVE_MAINTAINER_SCORE");
        expect(score).toBeGreaterThan(0);
    });
});

// Net Score Cacluation Testing
describe("NetScore", () => {
    it("is expected to return the Net Score calculation score", async () => {
        const net_score = new NetScore();
        const pckg = new Package("https://www.npmjs.com/package/karma", "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");
        const score = await net_score.score(pckg);
        expect(score).toBeDefined();
        expect(net_score.get_name()).toBe("NET_SCORE");
        expect(score).toBeGreaterThan(0);
    });
});
