import { Correctness, Metric } from "./metrics";
import { NPM_api_engine } from "./api";
import { Package } from "./package";

export class Score 
{
    private total: number;
    private metric_scores: Object;

    constructor()
    {
        this.total = NaN;
        this.metric_scores = {};
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :Metric: metric
    //  param :number: score
    // Output: None
    // Associated: 
    // Description: Adds a metric's score to the object.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public add_score(metric: Metric, score: number)
    {
        this.metric_scores[metric.get_name()] = score;
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: None
    // Output: None
    // Associated: 
    // Description: Gets the total (overall) score
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public get_total()
    {
        return this.total;
    }

    public get_metric_scores()
    {
        return this.metric_scores;
    }

    
}

export class Evaluator
{
    private metrics: Array<Metric>;
    private npm_engine: NPM_api_engine;

    constructor()
    {
        this.metrics = [];
        this.npm_engine = new NPM_api_engine();
        //Do for each metric
        let correctness = new Correctness();
        this.metrics.push(correctness);
    }

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    //  param :Object: metadata
    // Output: 
    // Associated: 
    // Description: 
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public evaluate(pkg: Package)
    {
        //Loop through each metric and get score
        let score = new Score();
        
        //for ...
        score.add_score(this.metrics[0], this.metrics[0].score(pkg));
        return score;
    }
    
}