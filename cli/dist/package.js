"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package = void 0;
class Package {
    constructor(_url) {
        this.url = _url;
        //Put regex stuff here to store things like domain, pkg name, etc.
        //this.name = match.group() ... 
        //this.domain = match.group() ...
        this.metadata = {};
    }
    get_name() {
        return this.name;
    }
    get_domain() {
        return this.domain;
    }
    get_metadata() {
        return this.metadata;
    }
    get_url() {
        return this.url;
    }
}
exports.Package = Package;
