
import { NPM_api_engine } from "./api";
import { Evaluator, Score} from "./evaluator";
import { Package } from "./package";


export class NPM_handler {

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
        return this.evaluator.evaluate(pkg);
    }
}


class GitHub_handler 
{
    constructor() {}
}

//Proof of concept
// let handler = new NPM_handler();
// let url = "https://www.npmjs.com/package/safe-regex"
// let pkg = new Package(url);

// console.log(handler.get_metadata(pkg));

// let score = handler.evaluate(pkg);

// console.log(score.get_total());
