"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NPM_handler = void 0;
const api_1 = require("./api");
const evaluator_1 = require("./evaluator");
class NPM_handler {
    constructor() {
        this.api_engine = new api_1.NPM_api_engine();
        this.evaluator = new evaluator_1.Evaluator();
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    // Output: None
    // Associated: 
    // Description: This function uses the api engine to get the metadata for the given package name.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    async get_metadata(pkg) {
        return this.api_engine.get_metadata(pkg);
    }
    score_package(pkg) {
        return this.evaluator.evaluate(pkg);
    }
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    // Parameters: 
    //  param :string: package_name
    // Output: None
    // Associated: 
    // Description: Returns a Score object encapsulating the result of individual metrics and the total score.
    // -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    evaluate(pkg) {
        return this.evaluator.evaluate(pkg);
    }
}
exports.NPM_handler = NPM_handler;
class GitHub_handler {
    constructor() { }
}
//Proof of concept
// let handler = new NPM_handler();
// let url = "https://www.npmjs.com/package/safe-regex"
// let pkg = new Package(url);
// console.log(handler.get_metadata(pkg));
// let score = handler.evaluate(pkg);
// console.log(score.get_total());
