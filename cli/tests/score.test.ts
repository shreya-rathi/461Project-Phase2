import { describe, it, expect } from "@jest/globals";
//import { Score } from "../evaluator";
import { RampUp, Correctness, BusFactor, Responsiveness, LicenseCompatibility } from '../src'; 

describe("BusFactor", () => {
    it("should return the bus factor score", async () => {
        const bus_factor_score = new BusFactor();
        const score = await bus_factor_score.getScore();
        expect(score).toBeDefined();
        expect(bus_factor_score.name).toBe("Bus Factor");
        expect(score).toBeGreaterThan(0);
    });
});

describe("Responsiveness", () => {
    it("should return the responsiveness score", async () => {
        const responsiveness_score = new Responsiveness();
        const score = await responsiveness_score.getScore();
        expect(score).toBeDefined();
        expect(responsiveness_score.name).toBe("Responsiveness");
        expect(score).toBeGreaterThan(0);
    });
});

describe("RampUp", () => {
    it("should return the ramp-up time score", async () => {
        const ramp_up_score = new RampUp();
        const score = await ramp_up_score.getScore();
        expect(score).toBeDefined();
        expect(ramp_up_score.name).toBe("Ramp-Up Time");
        expect(score).toBeGreaterThan(0);
    });
});

describe("Correctness", () => {
    it("should return the correctness score", async () => {
        const correctness_score = new Correctness();
        const score = await correctness_score.getScore();
        expect(score).toBeDefined();
        expect(correctness_score.name).toBe("Correctness");
        expect(score).toBeGreaterThan(0);
    });
});

describe("LicenseCompatibility", () => {
    it("should return the license compatibility score", async () => {
        const license_compatibility_score = new LicenseCompatibility();
        const score = await license_compatibility_score.getScore();
        expect(score).toBeDefined();
        expect(license_compatibility_score.name).toBe("License Compatibility");
        expect(score).toBeGreaterThan(0);
    });
});

// netscore test