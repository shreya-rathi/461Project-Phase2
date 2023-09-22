"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Package_Installer = void 0;
class Package_Installer {
    constructor() {
    }
    clone_repo(pkg, target_dir = "./tmp/repositories", clone_level = "deep") {
        if (clone_level == "deep") {
            //Try clone repo
            //Handle errors and log
        }
        else if (clone_level == "shallow") {
            //Try clone repo
            //Handle errors and log
        }
        else {
            //Invalid copy level
            //Log
        }
    }
    delete_repo(repo_name, repo_path = "./tmp/repositories") {
        //Try delete
        //handle error and log
    }
    install_pkg(pkg) {
    }
}
exports.Package_Installer = Package_Installer;
