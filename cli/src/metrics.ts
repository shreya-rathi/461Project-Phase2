// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/07/2023
// Author: Ethan Burmane
// Description: This file will contain all of the functions to calculate the metrics
// Actions: 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { execSync } from "child_process";

class Metric {

    constructor(private repoUrl: string) {
        this.repoUrl = repoUrl;
    }

    cloneRepo(tempDir: string): void {
        try {
            execSync('git clone ${repoUrl} ${tempDir}');
        } catch (error) { 
            console.log(error)
        }
    }

    deleteRepo(): void {

    }
}

class BusFactor extends Metric {

    constructor(repo_url: string) {
        super(repo_url);
        // clone repo
        // calculate bus factor
        // delete repo
    }

    // git shortlog -s -n : gives the number of commits per contributor in descending order
    // git rev-list --count --all : gives the total number of commits

    getTopCommitterPerc(): number {

        let commitLog = execSync('git shortlog -s -n');
        let numberCommits = execSync('git rev-list --count --all');

        // parsing commit log for top commiter

        // calculating top committer percentage

        // returning top committer percentage

        return(0);
    }

    getXCommitterPerc(): number {

        let commitLog = execSync('git shortlog -s -n');
        let numberCommits = execSync('git rev-list --count --all');

        // parsing commit log for top x commiters

        // calculating top x committer percentage

        // returning top x committer percentage

        return(0);
    }

    getNumberCommitters(): number {

        let commitLog = execSync('git shortlog -s -n');

        // parsing commit log for number of commiters

        // returning number of commiters

        return(0);
    }

    calculateBusFactor(): number {

        // getting metric values
        let topCommitterPerc: number = this.getTopCommitterPerc();
        let xCommitterPerc: number = this.getXCommitterPerc();
        let numberCommitters: number = this.getNumberCommitters();

        // setting metric weights
        let funcSteepness: number = 0.1;
        let topCommitterWeight: number = 0.3;
        let committerPercWeight: number = 0.3;
        let numberCommittersWeight: number = 0.4;

        // calculating metric values
        let topCommitterPercFunc: number = 1 / (1 + (Math.E ** (-1 * (funcSteepness / topCommitterPerc))));
        let xCommitterPercFunc: number = 1 / (1 + (Math.E ** (-1 * (funcSteepness / xCommitterPerc))));
        let numberCommittersFunc: number = 1 / (1 + (Math.E ** (-1 * funcSteepness * numberCommitters)));

        // calculating bus factor
        let busFactor: number = (topCommitterWeight * topCommitterPercFunc) + (committerPercWeight * xCommitterPercFunc) + (numberCommittersWeight * numberCommittersFunc);

        return busFactor;
    }

}

class License extends Metric {
    
    constructor(repo_url: string) {
        super(repo_url);
    }

}

class RampUp extends Metric {

    constructor(repo_url: string) {
        super(repo_url);
    }

}

class ResponsiveMaintainer extends Metric {

    constructor(repo_url: string) {
        super(repo_url);
    }

    getLastCommit(): number {

        let lastCommit = execSync('git log -1 --format=%ct');

        return(0);
    }

}

class Correctness extends Metric {
    
    constructor(repo_url: string) {
        super(repo_url);
    }
    
}

class NetScore extends Metric {

    constructor(repo_url: string) {
        super(repo_url);
    }

}