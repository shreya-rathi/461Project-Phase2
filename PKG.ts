import axios from 'axios';
import { log } from 'console';

class Package {

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
    public LicenseScore: number;
    public LicenseName: string;

    public BusFactorScore: number;
    public CorrectnessScore: number;
    public RampUpScore: number;  
    public MaintenanceScore: number;
    public Netscore: number; //final score

    //Regex for github and npm
    private githubRegex: RegExp = /^https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    private npmRegex: RegExp = /^https?:\/\/(?:www\.)?npmjs\.com\/package\/[^/]+\/?$/;

    //Pulled Data
    public RepositoryData: any | null = null;
    public githubRepositoryLicense: string | null = null;
    public data;


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
            this.Github_Handler(this.owner, this.repo);
        }else if (this.type == "npm") {
            this.Npm_Handler(this.repo);
        }else {
            console.log("Invalid URL");
        }

    }


    private async Github_Handler(owner: string, repo: string) {
        //potentially put in constructor
        // put cloning here


        await this.License(this.owner, this.repo);
        console.log("Github Repository URL");
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
        this.CorrectnessScore = this.Correctness(); 
        this.RampUpScore = this.RampUp();
        this.MaintenanceScore = this.Maintenance();
        
        //temp calculation DO NOT USE IN FINAL
        this.Netscore = (this.LicenseScore + this.BusFactorScore + this.CorrectnessScore +  + this.RampUpScore + this.MaintenanceScore)/5;
    }

    public async License(owner: string, repo: string){
        this.LicenseScore = 0;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/license`;
        try {
            const response = await axios.get(apiUrl, {
              headers: {
                Authorization: `Bearer ${this.githubToken}`,
              },
            });
            
            if (response.status === 200) {
              //log(response.data);
              //console.log(response.data);
              this.data = response.data;
              if (this.data && this.data.license.name) {
                this.LicenseName = this.data.license.name; // Store the license
                this.LicenseScore = 1;
              } else {
                this.LicenseName = 'License information not found';
              }
            } else {
              this.LicenseName = 'GitHub API request failed with status: ' + response.status;
            }
          } catch (error) {
            this.LicenseName = 'Error while making the GitHub API request: ' + error.message;
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
  const GIT_TOKEN: string = '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';
  const test = new Package(IURL, GIT_TOKEN);
 
  //console.log(test.owner)
  //console.log(test.repo);
  
  // Wait for the API call to complete
  await test.License(test.owner, test.repo);

  // Now you can log LicenseName
  console.log(test.LicenseName);
}

main();