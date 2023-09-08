// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.0
// Date: 09/07/2023
// Author: Ethan Burmane
// Description: This file will contain all of the functions to calculate the metrics
// Actions: 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import * as child_process from "child_process";

class Metric {

    constructor(private repo_url: string) {
        this.repo_url = repo_url;
    }

    cloneRepo(): void {
        child_process.execSync("git clone {repo_url}");
    }

    deleteRepo(): void {

    }
}

class BusFactor extends Metric {

    constructor(repo_url: string) {
        super(repo_url);
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