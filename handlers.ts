
import { NPM_api_engine } from "./api";
import { Evaluator } from "./evaluator";
//URL handler for npm URLs
//Instantiate with url
//Parse url
//Hit npm API for needed data
//If no error
//  feed data into metrics
//  calculate overall score
//  actually download package
//  
class NPM_handler {

    private api_engine: NPM_api_engine;
    private evaluator: Evaluator;

    constructor()
    {
        this.api_engine = new NPM_api_engine();
        this.evaluator = new Evaluator();
    }

    public async get_metadata(package_name: string)
    {
        return this.api_engine.get_metadata(package_name);
    }

    public evaluate(package_name: string)
    {
        const metadata = this.get_metadata(package_name);
        return this.evaluator.evaluate(package_name, metadata);
    }
}

let handler = new NPM_handler();
let package_name = "safe-regex";

console.log(handler.get_metadata(package_name));

let score = handler.evaluate(package_name);

console.log(score.get_total());
