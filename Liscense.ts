import axios from 'axios';
import { log } from 'console';

class UrlHandler {
  private githubRegex: RegExp;
  private npmRegex: RegExp;
  public urlList: string[] = [];
  private githubToken: string;
  public RepositoryData: any | null = null;
  public githubRepositoryLicense: string | null = null;

  constructor(githubToken: string) {
    this.githubRegex = /^https?:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/;
    this.npmRegex = /^https?:\/\/(?:www\.)?npmjs\.com\/package\/[^/]+\/?$/;
    this.githubToken = githubToken;
  }

  private async github_handler(owner: string, repo: string) {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/license`;

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${this.githubToken}`,
        },
      });

      if (response.status === 200) {
        log(response.data);
        //log(response.data);
        this.RepositoryData = response.data;
        if (this.RepositoryData && this.RepositoryData.license.name) {
          this.githubRepositoryLicense = this.RepositoryData.license.name; // Store the license
        } else {
          this.githubRepositoryLicense = 'License information not found';
        }
      } else {
        this.githubRepositoryLicense = 'GitHub API request failed with status: ' + response.status;
      }
    } catch (error) {
      this.githubRepositoryLicense = 'Error while making the GitHub API request: ' + error.message;
    }
  }

  public async Parse(url: string) {
    if (this.githubRegex.test(url)) {
      const parts = url.split('/');
      const repo = parts[parts.length - 1]; // GitHub Repo Name
      const owner = parts[parts.length - 2]; // GitHub Username
      await this.github_handler(owner, repo);
      console.log("GitHub Repository URL");
    } else if (this.npmRegex.test(url)) {
      console.log("NPM Repository URL");
    } else {
      this.urlList.push(url);
      console.log("Neither GitHub nor NPM Repository URL");
    }
    return url;
  }

  public logGitHubRepositoryLicense() {
    console.log('GitHub Repository License:', this.githubRepositoryLicense);
  }
}

const githubToken = 'GIT_TOKEN';
const urlHandler = new UrlHandler(githubToken);


async function fetchData() {
  await urlHandler.Parse("https://github.com/yoheinakajima/instagraph");
  urlHandler.logGitHubRepositoryLicense(); 
}

fetchData();
