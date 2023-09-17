import { Correctness, Metric } from "./metrics";



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

    
}

export class Evaluator
{
    private metrics: Array<Metric>;

    constructor()
    {
        this.metrics = [];

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
    public evaluate(package_name: string, metadata: Object)
    {
        //Loop through each metric and get score
        //for ...
        let score = new Score();

        score.add_score(this.metrics[0], this.metrics[0].score(package_name, metadata));

        return score;
    }
    
}