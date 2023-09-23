"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Evaluator = exports.Score = void 0;
const metrics_1 = require("./metrics");
const api_1 = require("./api");
class Score {
    constructor() {
        this.total = NaN;
        //Format {metric_name: score (0..1)}
        this.metric_scores = {};
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :Metric_interface: metric
    //  param :number: score
    // Output: None
    // Associated: 
    // Description: Adds a metric's score to the object.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    add_score(metric, score) {
        this.metric_scores[metric.get_name()] = score;
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: None
    // Output: None
    // Associated: 
    // Description: Gets the total (overall) score
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    get_total() {
        return this.total;
    }
    get_metric_scores() {
        return this.metric_scores;
    }
}
exports.Score = Score;
class Evaluator {
    constructor() {
        this.metrics = [];
        this.npm_engine = new api_1.NPM_api_engine();
        //Do for each metric
        let correctness = new metrics_1.Correctness();
        this.metrics.push(correctness);
        let bus_factor = new metrics_1.BusFactor();
        this.metrics.push(bus_factor);
        let responsive_maintainer = new metrics_1.ResponsiveMaintainer();
        this.metrics.push(responsive_maintainer);
        let license = new metrics_1.License();
        this.metrics.push(license);
        let ramp_up = new metrics_1.RampUp();
        this.metrics.push(ramp_up);
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    //  param :Object: metadata
    // Output: 
    // Associated: 
    // Description: 
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    evaluate(pkg) {
        //Loop through each metric and get score
        let score = new Score();
        //for each metric
        //Metric.score() will take a package and do whatever it needs with the api engines available to the Metrics
        // and will return the calculated score, normalized to be between 1 and 0.
        for (let m = 0; m < this.metrics.length; m++) {
            score.add_score(this.metrics[m], this.metrics[m].score(pkg));
        }
        // Do net score 
        return score;
    }
}
exports.Evaluator = Evaluator;
