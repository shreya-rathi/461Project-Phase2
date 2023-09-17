
import { NPM_api_engine } from "./api";
import { Evaluator, Score} from "./evaluator";
import { Package } from "./package";
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

    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    // Output: None
    // Associated: 
    // Description: This function uses the api engine to get the metadata for the given package name.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public async get_metadata(pkg: Package)
    {
        return this.api_engine.get_metadata(pkg);
    }

    public score_package(pkg: Package)
    {
        return this.evaluator.evaluate(pkg)
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    // Output: None
    // Associated: 
    // Description: Returns a Score object encapsulating the result of individual metrics and the total score.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    public evaluate(pkg: Package) : Score
    {
        const metadata = this.get_metadata(pkg);
        return this.evaluator.evaluate(pkg);
    }
}

let handler = new NPM_handler();
let pkg = new Package("safe-regex", "npm");

console.log(handler.get_metadata(pkg));

let score = handler.evaluate(pkg);

console.log(score.get_total());
