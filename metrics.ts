import * as child_process from "child_process";

function bus_factor(repo_url: string) {

    // clone from git repo (only necessary files)
    child_process.execSync("git clone {repo_url}");

    // access meta data from git repo
    // calculate bus factor
    // clean up (delete cloned repo)

}

function clone_repo() {


}