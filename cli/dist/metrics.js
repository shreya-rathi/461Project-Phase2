"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetScore = exports.ResponsiveMaintainer = exports.RampUp = exports.License = exports.BusFactor = exports.Correctness = void 0;
const child_process_1 = require("child_process");
const logger_1 = require("./logging/logger");
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the correctness metric. The correctness metric is calculated by ...
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
class Correctness {
    constructor() {
        this.name = "CORRECTNESS_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        return 0;
    }
}
exports.Correctness = Correctness;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the bus factor metric. The bus factor metric is calculated by using git 
// metadata to determine the percentage of total commits that came from the top commiter, the 
// percentage of total commits that came from the top five commiter, and the number of committers. 
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
class BusFactor {
    constructor() {
        this.name = "BUS_FACTOR_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        const temp_dir = "";
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
        const bus_factor_score = (top_commiter_weight * top_commiter_perc_func)
            + (top_x_commiter_weight * top_x_commiter_perc_func)
            + (number_committers_weight * number_committers_func);
        logger_1.logger.info("bus factor score calculated", {
            msg: "bus factor score calculated",
            module: "BusFactor.prototype.score",
            timestamp: new Date()
        });
        return bus_factor_score;
    }
    get_top_committer_perc(temp_dir) {
        // switching to the correct directory
        try {
            process.chdir(temp_dir);
        }
        catch (error) {
            logger_1.logger.error("could not change directory to temp directory", {
                msg: "could not change directory to temp directory",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // retrieving the number of commits 
        let commit_count;
        try {
            const commit_count_output = (0, child_process_1.execSync)(`git rev-list --count --all`, { encoding: 'utf-8' });
            commit_count = +commit_count_output;
        }
        catch (error) {
            logger_1.logger.error("could not retrieve number of commits", {
                msg: "could not retrieve number of commits",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // retrieving the number of commits from the top committer and calculating the percentage
        let commit_list_output;
        try {
            commit_list_output = (0, child_process_1.execSync)('git shortlog -s -n', { encoding: 'utf-8' });
        }
        catch (error) {
            logger_1.logger.error("could not retrieve number of commits from top committer", {
                msg: "could not retrieve number of commits from top committer",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        const first_num = commit_list_output.match(/\d+/);
        if (first_num === null) {
            logger_1.logger.error("could not retrieve number of commits from top committer", {
                msg: "could not retrieve number of commits from top committer",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        const top_commits = parseInt(first_num[0], 10);
        const top_committer_perc = top_commits / commit_count;
        logger_1.logger.info("top committer percentage calculated", {
            msg: "top committer percentage calculated",
            module: "get_top_commiter_perc",
            timestamp: new Date()
        });
        return top_committer_perc;
    }
    get_top_x_committer_perc(temp_dir) {
        // switching to the correct directory
        try {
            process.chdir(temp_dir);
        }
        catch (error) {
            logger_1.logger.error("could not change directory to temp directory", {
                msg: "could not change directory to temp directory",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // retreiving the number of commits
        let commit_count;
        try {
            const commit_count_output = (0, child_process_1.execSync)(`git rev-list --count --all`, { encoding: 'utf-8' });
            commit_count = +commit_count_output;
        }
        catch (error) {
            logger_1.logger.error("could not retrieve number of commits", {
                msg: "could not retrieve number of commits",
                module: "get_top_x_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // retreiving the number of commits from the top x committers and calculating the percentage
        let commit_list_output;
        try {
            commit_list_output = (0, child_process_1.execSync)('git shortlog -s -n', { encoding: 'utf-8' });
        }
        catch (error) {
            logger_1.logger.error("could not retrieve number of commits from top x committers", {
                msg: "could not retrieve number of commits from top x committers",
                module: "get_top_x_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        const first_num = commit_list_output.match(/\d+/);
        if (first_num === null) {
            logger_1.logger.error("could not retrieve number of commits from top x committers", {
                msg: "could not retrieve number of commits from top x committers",
                module: "get_top_x_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        let x = 5;
        let top_x_commits = 0;
        try {
            for (let i = 0; i < x; i++) {
                top_x_commits += parseInt(first_num[i], 10);
            }
        }
        catch (error) {
            logger_1.logger.error("x was greater than the number of commits", {
                msg: "x was greater than the number of commits",
                module: "get_top_x_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        const top_x_committer_perc = top_x_commits / commit_count;
        logger_1.logger.info("top x committer percentage calculated", {
            msg: "top x committer percentage calculated",
            module: "get_top_x_commiter_perc",
            timestamp: new Date()
        });
        return top_x_committer_perc;
    }
    get_number_committers(temp_dir) {
        // switching to the correct directory
        try {
            process.chdir(temp_dir);
        }
        catch (error) {
            logger_1.logger.error("could not change directory to temp directory", {
                msg: "could not change directory to temp directory",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // retrieving the number of committers
        let output_buffer;
        try {
            output_buffer = (0, child_process_1.execSync)(`git log --format='%ae' | sort -u | wc -l`, { encoding: 'utf-8' });
        }
        catch (error) {
            logger_1.logger.error("could not retrieve number of committers", {
                msg: "could not retrieve number of committers",
                module: "get_number_committers",
                timestamp: new Date()
            });
            return 0;
        }
        const committer_count_string = parseInt(output_buffer.toString(), 10);
        const committer_count = +committer_count_string;
        logger_1.logger.info("number of committers calculated", {
            msg: "number of committers calculated",
            module: "get_number_committers",
            timestamp: new Date()
        });
        return committer_count;
    }
}
exports.BusFactor = BusFactor;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the license metric. The license metric is calculated by ...
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
class License {
    constructor() {
        this.name = "LICENSE_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        return 0;
    }
}
exports.License = License;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the ramp up metric. The ramp up metric is calculated by ...
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the responsive maintainer metric. The responsive maintainer metric is 
// calculated by using git metadata to determine the number of days since the last commit and the
// number of commits in the last thirty days.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
class ResponsiveMaintainer {
    constructor() {
        this.name = "RESPONSIVE_MAINTAINER_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        const temp_dir = "";
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
        const responsive_maintainer_score = (last_commit_weigth * last_commit_func)
            + (commit_frequency_weight * commit_frequency_func);
        logger_1.logger.info("responsive maintainer score calculated", {
            msg: "responsive maintainer score calculated",
            module: "ResponsiveMaintainer.prototype.score",
            timestamp: new Date()
        });
        return responsive_maintainer_score;
    }
    get_last_commit(temp_dir) {
        // switching to the correct directory
        try {
            process.chdir(temp_dir);
        }
        catch (error) {
            logger_1.logger.error("could not change directory to temp directory", {
                msg: "could not change directory to temp directory",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // retrieving the date of the last commit
        let last_commit_output;
        try {
            last_commit_output = (0, child_process_1.execSync)('git log -1 --format=%ai', { encoding: 'utf-8' });
        }
        catch (error) {
            logger_1.logger.error("could not retrieve date of last commit", {
                msg: "could not retrieve date of last commit",
                module: "get_last_commit",
                timestamp: new Date()
            });
            return 0;
        }
        const last_commit_date = last_commit_output.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (last_commit_date === null) {
            logger_1.logger.error("could not retrieve date of last commit", {
                msg: "could not retrieve date of last commit",
                module: "get_last_commit",
                timestamp: new Date()
            });
            return 0;
        }
        const last_commit_year = parseInt(last_commit_date[1], 10);
        const last_commit_month = parseInt(last_commit_date[2], 10);
        const last_commit_day = parseInt(last_commit_date[3], 10);
        // retrieving the current date and calculating the number of days since the last commit
        const today = new Date();
        const lastCommitDate = new Date(last_commit_year, last_commit_month - 1, last_commit_day);
        const time_difference = today.getTime() - lastCommitDate.getTime();
        const last_commit = Math.floor(time_difference / (1000 * 3600 * 24));
        logger_1.logger.info("number of days since last commit calculated", {
            msg: "number of days since last commit calculated",
            module: "get_last_commit",
            timestamp: new Date()
        });
        return last_commit;
    }
    get_commit_frequency(temp_dir) {
        // switching to the correct directory
        try {
            process.chdir(temp_dir);
        }
        catch (error) {
            logger_1.logger.error("could not change directory to temp directory", {
                msg: "could not change directory to temp directory",
                module: "get_top_commiter_perc",
                timestamp: new Date()
            });
            return 0;
        }
        // getting the number of commits in the last thirty days
        const thirty_days = new Date();
        thirty_days.setDate(thirty_days.getDate() - 30);
        const formatted_date = thirty_days.toISOString().split('T')[0];
        let commit_frequency_output;
        try {
            commit_frequency_output = (0, child_process_1.execSync)(`git rev-list --count --since="${formatted_date}" HEAD`, { encoding: 'utf-8' });
        }
        catch (error) {
            logger_1.logger.error("could not retrieve number of commits in the last thirty days", {
                msg: "could not retrieve number of commits in the last thirty days",
                module: "get_commit_frequency",
                timestamp: new Date()
            });
            return 0;
        }
        const commit_frequency = +commit_frequency_output;
        logger_1.logger.info("number of commits in the last thirty days calculated", {
            msg: "number of commits in the last thirty days calculated",
            module: "get_commit_frequency",
            timestamp: new Date()
        });
        return commit_frequency;
    }
}
exports.ResponsiveMaintainer = ResponsiveMaintainer;
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// This class contains the net score metric. The net score metric is calculated by calling the 
// score() function of each of the other metrics and then combining them into a single score.
// The correct JSON formatting is then applied to the score and it is returned.
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
class NetScore {
    constructor() {
        this.name = "NET_SCORE";
    }
    get_name() {
        return this.name;
    }
    score(pkg) {
        const temp_dir = "";
        const url = "";
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
        logger_1.logger.info("net score calculated", {
            msg: "net score calculated",
            module: "NetScore.prototype.score",
            timestamp: new Date()
        });
        return net_score;
    }
}
exports.NetScore = NetScore;
