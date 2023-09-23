"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetScore = exports.ResponsiveMaintainer = exports.RampUp = exports.License = exports.BusFactor = exports.Correctness = void 0;
const child_process_1 = require("child_process");
class Correctness {
    constructor() {
        this.name = "CORRECTNESS_SCORE";
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    //  param :Object: metadata
    // Output: None
    // Associated: 
    // Description: Uses the available data to calculate the score for correctness
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    score(pkg) {
        return 0;
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: None
    // Output: None
    // Associated: 
    // Description: Gets the metric name. 
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    get_name() {
        return this.name;
    }
}
exports.Correctness = Correctness;
class BusFactor {
    constructor() {
        this.name = "BUS_FACTOR_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        const temp_dir = "";
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
    get_top_committer_perc(temp_dir) {
        process.chdir(temp_dir);
        const commit_count_output = (0, child_process_1.execSync)(`git rev-list --count --all`, { encoding: 'utf-8' });
        const commit_count = +commit_count_output;
        const commit_list_output = (0, child_process_1.execSync)('git shortlog -s -n', { encoding: 'utf-8' });
        const first_num = commit_list_output.match(/\d+/);
        if (first_num === null) {
            return 0; // error goes here
        }
        const top_commits = parseInt(first_num[0], 10);
        const top_committer_perc = top_commits / commit_count;
        return top_committer_perc;
    }
    get_top_x_committer_perc(temp_dir) {
        process.chdir(temp_dir);
        const commit_count_output = (0, child_process_1.execSync)(`git rev-list --count --all`, { encoding: 'utf-8' });
        const commit_count = +commit_count_output;
        const commit_list_output = (0, child_process_1.execSync)('git shortlog -s -n', { encoding: 'utf-8' });
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
    get_number_committers(temp_dir) {
        process.chdir(temp_dir);
        const output_buffer = (0, child_process_1.execSync)(`git log --format='%ae' | sort -u | wc -l`);
        const committer_count_string = parseInt(output_buffer.toString(), 10);
        const committer_count = +committer_count_string;
        return committer_count;
    }
}
exports.BusFactor = BusFactor;
class License {
    constructor() {
        this.name = "LICENSE_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        //This is where your actual calculation should go 
        return 0;
    }
    get_top_committer_perc() {
        return 0;
    }
    get_top_x_committer_perc() {
        return 0;
    }
    get_number_committers() {
        return 0;
    }
}
exports.License = License;
class RampUp {
    constructor() {
        this.name = "RAMP_UP_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        return 0;
    }
}
exports.RampUp = RampUp;
class ResponsiveMaintainer {
    constructor() {
        this.name = "RESPONSIVE_MAINTAINER_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        const temp_dir = "";
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
    get_last_commit(temp_dir) {
        process.chdir(temp_dir);
        const last_commit_output = (0, child_process_1.execSync)('git log -1 --format=%ai', { encoding: 'utf-8' });
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
    get_commit_frequency(temp_dir) {
        process.chdir(temp_dir);
        const thirty_days = new Date();
        thirty_days.setDate(thirty_days.getDate() - 30);
        const formatted_date = thirty_days.toISOString().split('T')[0];
        const commit_frequency_output = (0, child_process_1.execSync)(`git rev-list --count --since="${formatted_date}" HEAD`, { encoding: 'utf-8' });
        const commit_frequency = +commit_frequency_output;
        return commit_frequency;
    }
}
exports.ResponsiveMaintainer = ResponsiveMaintainer;
class NetScore {
    constructor() {
        this.name = "NetScore";
    }
    score(pkg) {
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
    get_name() {
        return this.name;
    }
}
exports.NetScore = NetScore;
