import { Package } from "./package";

export class Package_Installer
{
    constructor()
    {

    }

    public clone_repo(pkg: Package, target_dir: string = "./tmp/repositories", clone_level: string = "deep")
    {
        if (clone_level == "deep")
        {
            //Try clone repo
            //Handle errors and log
        }
        else if (clone_level == "shallow")
        {
            //Try clone repo
            //Handle errors and log
        }
        else
        {
            //Invalid copy level
            //Log
        }
    }

    public delete_repo(repo_name: string, repo_path: string = "./tmp/repositories")
    {
        //Try delete
        //handle error and log
    }
}