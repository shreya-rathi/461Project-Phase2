import axios from 'axios';
import { execSync } from "child_process";
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';


export class Package {

    //INPUTS
    private githubToken: string;
    public url: string;

    //parsed url
    //will ether be github, npm or unknown
    public type: string; 
    public owner: string; 
    public repo: string;
   

    //metrics

    //license
    public LicenseScore: number = 0;
    public LicenseName: string = '';

    public BusFactorScore: number = 0;
    public CorrectnessScore: number = 0;
    public RampUpScore: number = 0;  
    public MaintenanceScore: number = 0;
    public Netscore: number = 0; //final score

    //Regex for github and npm
    private githubRegex: RegExp = /^https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    private npmRegex: RegExp = /^https?:\/\/(?:www\.)?npmjs\.com\/package\/[^/]+\/?$/;

    //Pulled Data
    public RepositoryData: any | null = null;
    public githubRepositoryLicense: string | null = null;
    public data: any;

    //Parses to send to correct handler
    //sets type, owner, repo
    //calls handler
    constructor(InputUrl: string, gitToken: string) {
        this.githubToken = gitToken;
        this.url = InputUrl;
        
        //parsing to get type, owner, repo
        if (this.githubRegex.test(InputUrl)) {
            this.type = "github";
            const parts = InputUrl.split('/');
            this.repo = parts[parts.length - 1]; // GitHub Repo Name
            this.owner = parts[parts.length - 2]; // GitHub Username
            
        }
        else if (this.npmRegex.test(InputUrl)) {
            this.type = "npm";
            const parts = InputUrl.split('/');
            this.repo = parts[parts.length - 1]; // GitHub Repo Name
            this.owner = parts[parts.length - 2]; // GitHub Username
        }
        else {
            this.type = "unknown";
            this.owner = "unknown";
            this.repo = "unknown";
        }


        if (this.type == "github") {
            this.Clone_Repo(this.owner, this.repo);
        }else if (this.type == "npm") {
            this.Npm_Handler(this.repo);
        }else {
            console.log("Invalid URL");
        }

        
    }


    private Clone_Repo(owner: string, repo: string): string {
        //potentially put in constructor
        // put cloning here
        const temp_dir = fs.mkdtempSync(path.join(os.tmpdir(), 'cli-temp-dir'));

        //Log cloning directory
        execSync(`git clone https://github.com/${owner}/${repo}.git`, {
          cwd: temp_dir,
          stdio: 'inherit', // Redirect child process' stdio to the parent
        });

        //testing liceense fetch 
        //await this.License(this.owner, this.repo);
        
        console.log("Github Repository URL");
        return temp_dir
    }

    private Delete_Repo(temp_dir: string) {
      //Log deleting repository
      fs.rmdirSync(temp_dir, { recursive: true });
    }

    private Npm_Handler(packageName: string) {
        //potentially put in constructor
        // put cloning here
        console.log("NPM Repository URL");
    }

    //modify as needed for each metric
    private Score(){
        this.License(this.owner, this.repo);
        this.BusFactorScore = this.Bus_Factor();
        //this.CorrectnessScore = this.Correctness(); 
        //this.RampUpScore = this.RampUp();
        //this.MaintenanceScore = this.Maintenance();
        
        //temp calculation DO NOT USE IN FINAL
        this.Netscore = (this.LicenseScore + this.BusFactorScore + this.CorrectnessScore +  + this.RampUpScore + this.MaintenanceScore)/5;
    }

    public async License(owner: string, repo: string){
        this.LicenseScore = 0;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/license`;
        try {
            //Log making get request
            const response = await axios.get(apiUrl, {
              headers: {
                Authorization: `Bearer ${this.githubToken}`,
              },
            });
            
            if (response.status === 200) {
              //Log successful response
              //log(response.data);
              //console.log(response.data);
              this.data = response.data;
              if (this.data && this.data.license.name) {
                this.LicenseName = this.data.license.name; // Store the license
                this.LicenseScore = 1;
              } else {
                //Log no license found
                this.LicenseName = 'License information not found';
              }
            } else {
              //Log unsuccessful response
              this.LicenseName = 'GitHub API request failed with status: ' + response.status;
            }
          } catch (error: unknown) {
            //Log error when making request
            this.LicenseName = 'Error while making the GitHub API request: ' + (error as Error).message;
          }

        //implement npm version
        
    }

    private Bus_Factor(){
        return 0;
    }

    private Correctness(){
        return 0;
    }

    private RampUp(){
        return 0;
    }

    private Maintenance(){
        return 0;
    }

    
}

async function main() {
  const IURL: string = "https://github.com/yoheinakajima/instagraph";
  const GIT_TOKEN: string = 'GIT_TOKEN';
  const test = new Package(IURL, GIT_TOKEN);
 
  console.log(test.owner);
  console.log(test.repo);
  
  // Wait for the API call to complete
  await test.License(test.owner, test.repo);

  // repository gets cloned in constructor

  // need to delete repo after running each metric

  // Now you can log LicenseName
  console.log(test.LicenseName);
}

main();