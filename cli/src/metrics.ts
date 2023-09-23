import { Package_Installer } from "./installer";
import { execSync } from "child_process";
import { Package } from './PKG';
import { commit } from "isomorphic-git";
import { get } from "http";

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This is the interface for the metrics. It requires each class that implements it to have a 
// name, a get_name() function, and a score() function.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export interface Metric {
    name: string;
    get_name(): string;
    score(pkg: Package): number;
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the correctness metric. The correctness metric is calculated by ...
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export class Correctness implements Metric
{
    name = "CORRECTNESS_SCORE"

    public get_name() : string {
        return this.name;
    }

    public score(pkg: Package) : number {
        return 0;
    }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the bus factor metric. The bus factor metric is calculated by using git 
// metadata to determine the percentage of total commits that came from the top commiter, the 
// percentage of total commits that came from the top five commiter, and the number of committers. 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export class BusFactor implements Metric {

    name = "BUS_FACTOR_SCORE";

    public get_name() : string {
        return this.name;
    }

    public score(pkg: Package) : number {
        const temp_dir: string = "";

        // setting the constants for the bus factor score
        const func_steepness = 0.1;
        const top_commiter_weight = 0.3;
        const top_x_commiter_weight = 0.3;
        const number_committers_weight = 0.4;

        // retreiving the fields needed to calculate the bus factor score
        const top_commiter_perc = this.get_top_committer_perc(temp_dir);
        const top_x_commiter_perc = this.get_top_x_committer_perc(temp_dir);
        const number_committers = this.get_number_committers(temp_dir);

        // calculating the bus factor score
        const top_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_commiter_perc - 0.5)));
        const top_x_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_x_commiter_perc - 0.5)));
        const number_committers_func = 1 / (1 + Math.exp(-func_steepness * number_committers));
        const bus_factor_score = (top_commiter_weight * top_commiter_perc_func) + (top_x_commiter_weight * top_x_commiter_perc_func) + (number_committers_weight * number_committers_func);
        return bus_factor_score;
    }

    public get_top_committer_perc(temp_dir: string): number {
        
        // switching to the correct directory
        process.chdir(temp_dir);

        // retrieving the number of commits 
        const commit_count_output = execSync(`git rev-list --count --all`, { encoding: 'utf-8' });
        const commit_count: number = +commit_count_output;

        // retrieving the number of commits from the top committer and calculating the percentage
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

        // switching to the correct directory
        process.chdir(temp_dir);

        // retreiving the number of commits
        const commit_count_output = execSync(`git rev-list --count --all`, { encoding: 'utf-8' });
        const commit_count: number = +commit_count_output;

        // retreiving the number of commits from the top x committers and calculating the percentage
        const commit_list_output = execSync('git shortlog -s -n', { encoding: 'utf-8' });
        const first_num = commit_list_output.match(/\d+/);
        if (first_num === null) {
            return 0; // error goes here
        }
        let x = 5;
        let top_x_commits = 0;
        for (let i = 0; i < x; i++) {
            top_x_commits += parseInt(first_num[i], 10);
        }
        const top_x_committer_perc = top_x_commits / commit_count;
        return top_x_committer_perc;
    }

    public get_number_committers(temp_dir: string): number {

        // switching to the correct directory
        process.chdir(temp_dir);

        // retrieving the number of committers
        const output_buffer = execSync(`git log --format='%ae' | sort -u | wc -l`);
        const committer_count_string = parseInt(output_buffer.toString(), 10);
        const committer_count: number = +committer_count_string
        return committer_count;
    }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the license metric. The license metric is calculated by ...
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export class License implements Metric {
    
    name = "LICENSE_SCORE";

    public get_name() : string{
        return this.name;
    }

    public score(pkg: Package) : number {
        return 0;
    }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the ramp up metric. The ramp up metric is calculated by ...
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export class RampUp implements Metric {

    name = "RAMP_UP_SCORE";

    public get_name() : string {
        return this.name;
    }

    public score(pkg: Package) : number {
        return 0;
    }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the responsive maintainer metric. The responsive maintainer metric is 
// calculated by using git metadata to determine the number of days since the last commit and the
// number of commits in the last thirty days.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export class ResponsiveMaintainer implements Metric {

    name = "RESPONSIVE_MAINTAINER_SCORE";

    public get_name() : string {
        return this.name;
    }

    public score(pkg: Package) : number {
        const temp_dir: string = "";

        // setting the constants for the responsive maintainer score
        const function_steepness = 0.1;
        const sigmoid_midpoint = 30;
        const commit_frequency_range = 30;
        const last_commit_weigth = 0.5;
        const commit_frequency_weight = 0.5;

        // retrieving the fields needed to calculate the responsive maintainer score
        const last_commit = this.get_last_commit(temp_dir);
        const commit_frequency = this.get_commit_frequency(temp_dir);

        // calculating the responsive maintainer score
        const last_commit_func = 1 / (1 + Math.exp(-function_steepness * (last_commit - sigmoid_midpoint)));
        const commit_frequency_func = 1 / (1 + Math.exp(-function_steepness * commit_frequency));
        const responsive_maintainer_score = (last_commit_weigth * last_commit_func) + (commit_frequency_weight * commit_frequency_func);
        return responsive_maintainer_score;
    }

    public get_last_commit(temp_dir: string): number {

        // switching to the correct directory
        process.chdir(temp_dir);

        // retrieving the date of the last commit
        const last_commit_output = execSync('git log -1 --format=%ai', { encoding: 'utf-8' });
        const last_commit_date = last_commit_output.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (last_commit_date === null) {
            return 0; // error goes here
        }
        const last_commit_year = parseInt(last_commit_date[1], 10);
        const last_commit_month = parseInt(last_commit_date[2], 10);
        const last_commit_day = parseInt(last_commit_date[3], 10);

        // retrieving the current date and calculating the number of days since the last commit
        const today = new Date();
        const lastCommitDate = new Date(last_commit_year, last_commit_month - 1, last_commit_day);
        const time_difference = today.getTime() - lastCommitDate.getTime();
        const last_commit = Math.floor(time_difference / (1000 * 3600 * 24));
        return last_commit;
    }

    public get_commit_frequency(temp_dir: string): number {

        // switching to the correct directory
        process.chdir(temp_dir);

        // getting the number of commits in the last thirty days
        const thirty_days = new Date();
        thirty_days.setDate(thirty_days.getDate() - 30);
        const formatted_date = thirty_days.toISOString().split('T')[0];
        const commit_frequency_output = execSync(`git rev-list --count --since="${formatted_date}" HEAD`, { encoding: 'utf-8' });
        const commit_frequency: number = +commit_frequency_output;
        return commit_frequency;
    }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the net score metric. The net score metric is calculated by calling the 
// score() function of each of the other metrics and then combining them into a single score.
// The correct JSON formatting is then applied to the score and it is returned.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export class NetScore implements Metric {

    name = "NET_SCORE";

    public get_name(): string {
        return this.name;
    }

    public score(pkg: Package) : number{
        const temp_dir = "";
        const url = ""

        // retrieving the scores for each metric
        const bus_factor_score = Math.floor(BusFactor.prototype.score(pkg));
        const responsive_maintainer_score = Math.floor(ResponsiveMaintainer.prototype.score(pkg));
        const correctness_score = Math.floor(Correctness.prototype.score(pkg));
        const ramp_up_score = Math.floor(RampUp.prototype.score(pkg));
        const license_score = Math.floor(License.prototype.score(pkg));

        // setting the constants for the net score
        const bus_factor_weight = 0.2;
        const responsive_maintainer_weight = 0.2;
        const correctness_weight = 0.2;
        const ramp_up_weight = 0.2;
        const license_weight = 0.2;
        
        // calculating the net score
        const net_score = Math.floor((bus_factor_weight * bus_factor_score) 
            + (responsive_maintainer_weight * responsive_maintainer_score) 
            + (correctness_weight * correctness_score) 
            + (ramp_up_weight * ramp_up_score) 
            + (license_weight * license_score));
        
        // formatting the net score as ndjson and printing it to stdout
        const score_json = [{
            "URL": url,
            "NET_SCORE": net_score,
            "RAMP_UP_SCORE": ramp_up_score,
            "CORRECTNESS_SCORE": correctness_score,
            "BUS_FACTOR_SCORE": bus_factor_score,
            "RESPONSIVE_MAINTAINER_SCORE": responsive_maintainer_score,
            "LICENSE_SCORE": license_score
        }];
        const ndjson_output = score_json.map((obj) => {
            return JSON.stringify(obj);
        }).join('\n');
        process.stdout.write(ndjson_output);
        return net_score;
    }
}

