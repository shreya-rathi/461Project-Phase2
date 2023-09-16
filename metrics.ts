import { Package } from "./package";
import { Package_Installer } from "./installer";
import { execSync } from "child_process";

export class Metric 
{
    downloader = new Package_Installer();

    constructor() 
    {
    }

    clone_repo(pkg: Package, target_dir: string = "./tmp/repositories"): void 
    {
        //Target directory and clone level can be optionally included but have defaults.
        this.downloader.clone_repo(pkg, target_dir);
    }

    delete_repo(): void 
    {

    }
}

export interface Metric_interface 
{
    name: string;
    get_name(): string;
    score(pkg: Package): number;

}

export class Correctness extends Metric implements Metric_interface
{
    name = "CORRECTNESS_SCORE";

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    //  param :Object: metadata
    // Output: None
    // Associated: 
    // Description: Uses the available data to calculate the score for correctness
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public score(pkg: Package)
    {
        return 0;
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: None
    // Output: None
    // Associated: 
    // Description: Gets the metric name. 
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public get_name() : string
    {
        return this.name;
    }

}

export class BusFactor extends Metric implements Metric_interface {

    name = "BUS_FACTOR_SCORE";
    constructor() {
        super();
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

    public get_name()
    {
        return this.name;
    }

    public score(pkg: Package) : number
    {
        //This is where your calculations should go 

        return 0;
    }

}

export class License extends Metric implements Metric_interface {
    
    name = "LICENSE_SCORE";

    constructor() {
        super();
    }

    public get_name()
    {
        return this.name;
    }

    public score(pkg: Package) : number
    {
        //This is where your actual calculation should go 

        return 0;
    }

}

export class RampUp extends Metric implements Metric_interface {

    name = "RAMP_UP_SCORE";

    constructor() {
        super();
    }

    public get_name()
    {
        return this.name;
    }

    public score(pkg: Package) : number
    {
        //This is where your actual calculation should go 

        return 0;
    }

}

export class ResponsiveMaintainer extends Metric implements Metric_interface {

    name = "RESPONSIVE_MAINTAINER_SCORE";

    constructor() {
        super();
    }

    public get_name()
    {
        return this.name;
    }

    public score(pkg: Package) : number
    {
        //This is where your actual calculation should go 

        return 0;
    }

    getLastCommit(): number {

        let lastCommit = execSync('git log -1 --format=%ct');

        return(0);
    }


}