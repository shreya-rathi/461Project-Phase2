import { Package_Installer } from "./installer";
import { execSync } from "child_process";
import { Package } from './PKG';
import { commit } from "isomorphic-git";
import { get } from "http";


export interface Metric 
{
    name: string;
    get_name(): string;
    score(pkg: Package): number;

}

export class Correctness implements Metric
{
    name = "CORRECTNESS_SCORE"

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

export class BusFactor implements Metric {

    name = "BUS_FACTOR_SCORE";

    public get_name() : string {
        return this.name;
    }

    public score(pkg: Package) : number {
        const temp_dir: string = "";

        const top_commiter_perc = this.get_top_committer_perc(temp_dir);
        const top_x_commiter_perc = this.get_top_x_committer_perc(temp_dir);
        const number_committers = this.get_number_committers(temp_dir);

        const func_steepness = 0.1;
        const top_commiter_weight = 0.3;
        const top_x_commiter_weight = 0.3;
        const number_committers_weight = 0.4;

        const top_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_commiter_perc - 0.5)));
        const top_x_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_x_commiter_perc - 0.5)));
        const number_committers_func = 1 / (1 + Math.exp(-func_steepness * number_committers));
        const bus_factor_score = (top_commiter_weight * top_commiter_perc_func) + (top_x_commiter_weight * top_x_commiter_perc_func) + (number_committers_weight * number_committers_func);

        return bus_factor_score;
    }

    public get_top_committer_perc(temp_dir: string): number {
        process.chdir(temp_dir);
        const commit_count_output = execSync(`git rev-list --count --all`, { encoding: 'utf-8' });
        const commit_count: number = +commit_count_output;

        const commit_list_output = execSync('git shortlog -s -n', { encoding: 'utf-8' });
        const first_num = commit_list_output.match(/\d+/);
        if (first_num === null) {
            return 0; // error goes here
        }
        const top_commits = parseInt(first_num[0], 10)
        const top_committer_perc = top_commits / commit_count;

        return top_committer_perc;
    }

    public get_top_x_committer_perc(temp_dir: string): number {
        process.chdir(temp_dir);
        const commit_count_output = execSync(`git rev-list --count --all`, { encoding: 'utf-8' });
        const commit_count: number = +commit_count_output;

         const commit_list_output = execSync('git shortlog -s -n', { encoding: 'utf-8' });
        const first_num = commit_list_output.match(/\d+/);
        if (first_num === null) {
            return 0; // error goes here
        }
        let top_x_commits = 0;
        for (let i = 0; i < 5; i++) {
            top_x_commits += parseInt(first_num[i], 10);
        }
        const top_x_committer_perc = top_x_commits / commit_count;

        return top_x_committer_perc;
    }

    public get_number_committers(temp_dir: string): number {
        process.chdir(temp_dir);
        const output_buffer = execSync(`git log --format='%ae' | sort -u | wc -l`);
        const committer_count_string = parseInt(output_buffer.toString(), 10);
        const committer_count: number = +committer_count_string
        return committer_count;
    }
}

export class License implements Metric {
    
    name = "LICENSE_SCORE";

    public get_name()
    {
        return this.name;
    }

    public score(pkg: Package) : number
    {
        //This is where your actual calculation should go 
        return 0;
    }

    private get_top_committer_perc()
    {
        return 0;
    }

    private get_top_x_committer_perc()
    {
        return 0;
    }

    private get_number_committers()
    {
        return 0;
    }
}

export class RampUp implements Metric {

    name = "RAMP_UP_SCORE";

    public get_name() : string
    {
        return this.name;
    }

    public score(pkg: Package) : number
    {


        return 0;
    }

}

export class ResponsiveMaintainer implements Metric {

    name = "RESPONSIVE_MAINTAINER_SCORE";

    public get_name() : string {
        return this.name;
    }

    public score(pkg: Package) : number {
        const temp_dir: string = "";

        const last_commit = this.get_last_commit(temp_dir);
        const commit_frequency = this.get_commit_frequency(temp_dir);

        const function_steepness = 0.1;
        const sigmoid_midpoint = 30;
        const commit_frequency_range = 30;
        const last_commit_weigth = 0.5;
        const commit_frequency_weight = 0.5;

        const last_commit_func = 1 / (1 + Math.exp(-function_steepness * (last_commit - sigmoid_midpoint)));
        const commit_frequency_func = 1 / (1 + Math.exp(-function_steepness * commit_frequency));
        const responsive_maintainer_score = (last_commit_weigth * last_commit_func) + (commit_frequency_weight * commit_frequency_func);

        return responsive_maintainer_score;
    }

    public get_last_commit(temp_dir: string): number {
        process.chdir(temp_dir);
        const last_commit_output = execSync('git log -1 --format=%ai', { encoding: 'utf-8' });
        const last_commit_date = last_commit_output.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (last_commit_date === null) {
            return 0; // error goes here
        }
        const last_commit_year = parseInt(last_commit_date[1], 10);
        const last_commit_month = parseInt(last_commit_date[2], 10);
        const last_commit_day = parseInt(last_commit_date[3], 10);

        const today = new Date();
        const lastCommitDate = new Date(last_commit_year, last_commit_month - 1, last_commit_day);
        const time_difference = today.getTime() - lastCommitDate.getTime();
        const last_commit = Math.floor(time_difference / (1000 * 3600 * 24));

        return last_commit;
    }

    public get_commit_frequency(temp_dir: string): number {
        process.chdir(temp_dir);
        const thirty_days = new Date();
        thirty_days.setDate(thirty_days.getDate() - 30);
        const formatted_date = thirty_days.toISOString().split('T')[0];
        
        const commit_frequency_output = execSync(`git rev-list --count --since="${formatted_date}" HEAD`, { encoding: 'utf-8' });
        const commit_frequency: number = +commit_frequency_output;

        return commit_frequency;
    }
}

export class NetScore implements Metric {

    name = "NetScore";

    public score(pkg: Package): number {
        // // weights for each metric based on the specified priorities
        // const weightBF = 0.2; // Bus Factor weight
        // const weightC = 0.2;  // Correctness weight
        // const weightRU = 0.2; // Ramp-Up weight
        // const weightRM = 0.2; // Responsive Maintainer weight
        // const weightL = 0.2;  // License weight

        // // Calculate the scores for each metric 
        // const busFactorScore = BusFactor.score(pkg);
        // const correctnessScore = Correctness.score(pkg);
        // const rampUpScore = RampUp.score(pkg);
        // const responsiveMaintainerScore = ResponsiveMaintainer.score(pkg);
        // const licenseScore = License.score(pkg);

        // // Calculate the net score as the weighted sum of metric scores
        // const netScore = (
        //     weightBF * busFactorScore +
        //     weightC * correctnessScore +
        //     weightRU * rampUpScore +
        //     weightRM * responsiveMaintainerScore +
        //     weightL * licenseScore
        // );

        // return netScore;
        return 0;
    }

    public get_name(): string {
        return this.name;
    }
}

