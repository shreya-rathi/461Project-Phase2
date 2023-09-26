# Main pipeline
* [Pipeline](https://lucid.app/lucidchart/6ac65f58-b4cb-483f-9bce-8f949223347e/edit?viewport_loc=104%2C-115%2C1931%2C1131%2C0_0&invitationId=inv_59f19485-31c5-4574-ba81-0903edaed925)
  
# Helper Classes
## Package
* Created to represent the packages to be evaluated ans scored.
* Holds useful information such as packge name, owner, repo location, etc.

### Constructor
* Creation of a package is simple and can be done with just a url
```typescript
import { Package } from "./PKG";

let pkg = new Package("https://www.npmjs.com/package/safe-regex");
```

* Inside of the constructor, the url is parsed and needed information is stored in the object.


# Commands
* The CLI commands are implemented using a module called 'commander'.
 * Creating a command looks like:
  * ```typescript
    import { Command } from "commander";
    function installCommand() {
    const install = new Command('install');

    install
       .description("Insert your command description.")
       .action(() => {
         installSomething();
         console.log("Installed!");
    return install;
    });
    ```     
 * Fill in .action with what you want to happen on call of the command.
 *  
## Pipelines

### ./run install
* Install dependencies
* [Pipeline](https://lucid.app/lucidchart/60603e27-1000-4fde-86d7-63de5030052c/edit?viewport_loc=192%2C226%2C1758%2C1029%2C0_0&invitationId=inv_4baa540d-4ab1-49cd-a42c-829a2ebb3d7d) 
  
### ./run URL_FILE
* Score packages from urls in provided file
* [Pipeline](https://lucid.app/lucidchart/6f345baf-decc-4c3d-a9ac-d18beed376ce/edit?invitationId=inv_286a5e09-8e48-4c5a-b945-7fee69e5c01b)

### ./run test
* Conduct test suite and output results
* [Pipeline](https://lucid.app/lucidchart/f9e8e454-c43d-437d-8afe-117b59ffd18f/edit?viewport_loc=89%2C39%2C1593%2C933%2C0_0&invitationId=inv_2ccb512b-07bb-4d8a-8b5d-7089f1cea216)

# Metrics

## Bus Factor
### Description
* Bus factor is a measurement of the spread of maintentance across different contributers.
  
### How we plan on measuring this
* To calculate the bus factor of a module, we will clone the repository and access the git metadata. 
* We will clone only the required files in order to minimize storage. 
* We will access the git log (one method might be using the git shortlog command), and look at the top contributors of the repository, and what percent each of them has contributed, as well as total number of contributors.
  
### Formula
* The code for the calculation
* ```typescript
  const top_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_commiter_perc - 0.5)));
  const top_x_commiter_perc_func = 1 / (1 + Math.exp(-func_steepness * (top_x_commiter_perc - 0.5)));
  const number_committers_func = 1 / (1 + Math.exp(-func_steepness * number_committers));
  const bus_factor_score = (top_commiter_weight * top_commiter_perc_func)
      + (top_x_commiter_weight * top_x_commiter_perc_func)
      + (number_committers_weight * number_committers_func);
  ```

## Correctness
### Description
* Our package manager should support packages with a high standard of correctness. Minimal errors, open issues, etc.
  
### How we plan on measuring this
* Looking at open issues we can get a good idea of the level of correctness of the desired package.
 * Current open issues
 * Average issues per month over the last year
 * Number of closed issues over time.
   
### Formula

## License
### Description
* Only packages with specific licenses will be available for download.
* Packages with an invalid license are given a 0 net score.
  
### How we plan on measuring this
* Repositories contain license information which is parsed for a valid license.
  
### Formula
* 1: If valid license.
* 0: Otherwise.

## Ramp Up
### Description
* Modules should be easy to pickup and use.
* Ramp Up measures this factor.
  
### How we plan on measuring this
* We believe a good indicator for this metric is how detailed the documentation is and how much it covers.

### Formula
 

## Responsive Maintainer
### Description
* Modules should be actively maintained such that bug fixes come quickly and security vulnerabilities do not remain available.
* 
### How we plan on measuring this
* Checking committer activity we believe is a good way to determine how active the maintenance is on the package.
* 
### Formula
* ```typescript
    const last_commit_func = 1 / (1 + Math.exp(-function_steepness * (last_commit - sigmoid_midpoint)));
    const commit_frequency_func = 1 / (1 + Math.exp(-function_steepness * commit_frequency));
    const responsive_maintainer_score = (last_commit_weigth * last_commit_func)
        + (commit_frequency_weight * commit_frequency_func);
   ```
  
## Net Score
### Description
* This is a representation of the overall score of a package, according to the provided metrics.
  
### How we plan on measuring this
* This will be mostly a weighted sum of the scores, normalized to be between 0 and 1.

### Formula
* L_sc = License Score
* max(0,L_sc) * (weighted sum)

# Logging
* Logging is implemented through a convenient library, called 'pino'.
 * The documentation for pino: https://github.com/pinojs/pino/tree/master/docs 
* Creating a logger looks like this:
 * ```typescript
   const pino = require('pino');
   
   const logger = pino(options, destination);
   ```
 * The options parameter can take many useful keys depending on what you want.
 * We use the following inside options:
  * level:
    * This is a string specifying the lowest level to be logged.
    * This is determined by the environment variable LOG_LEVEL
 * The destination parameter at least must contain a ```.write()``` method.
  
# Tests
* Unit tests are implemented through a library called 'jest'.
 * Test cases have the following structure
  * ```typescript
    import { describe, it, expect } from "@jest/globals";

    describe("Testing Package object", () =>
    {
      //A singular test under this group
      it("Is expected to return the name", () =>
      {
        let pkg = new Package("https://www.npmjs.com/package/karma");
        expect(pkg.get_name()).toBe("karma");
      });

     //Do more tests for the package object
    });
    ```

# GitHub

## The API
### Documentation
* REST API: https://docs.github.com/en/rest?apiVersion=2022-11-28
* Graph QL: https://docs.github.com/en/graphql

* We use the GitHub REST API for the following cases:
 * Getting the top number of committers

### Uses
* Getting data on issues
  * Current number opened
  * Number of closed issues
  * Accessing Readme file and License file
    
## Terminal commands
* Documentation https://git-scm.com/docs/git 

### Getting the top committers % of total commits
* ```Busfactor.get_top_committer_perc();```
* Executes ```execSync(`git rev-list --count --all`, { encoding: 'utf-8' });```
* Executes ```execSync('git shortlog -s -n', { encoding: 'utf-8' });```
### Getting the top x committers % of total commits
* ```Busfactor.get_top__x_committer_perc();```
* Executes ```execSync(`git rev-list --count --all`, { encoding: 'utf-8' });```
* Executes ```execSync('git shortlog -s -n', { encoding: 'utf-8' });```


### Getting the number of committers
* ```Busfactor.get_number_committers();```
* Executes ```execSync(`git log --format='%ae' | sort -u | wc -l`);```

# npm

## npm API
* We will use the npm API for the same purpose as the GitHub API
### Documentation
* REST API: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md

## npm install
* We use this command only to install the needed dependencies inside of ```./run install```

### Possible Errors
* List of possible errors when using npm install

* Missing package.json file:
  * npm requires a package.json file in the project directory to resolve and install dependencies. If this file is missing, you will get an error.

* Incorrect package.json: 
  * If your package.json file contains syntax errors or is incorrectly formatted, npm may fail to read it and throw an error.

* Network issues: 
  * npm requires an internet connection to fetch packages from the npm registry. Network issues, such as a lack of internet connectivity or firewall restrictions, can lead to errors.

* Registry issues:
  * The default npm registry might experience downtime or issues. You can switch to a different registry using npm config set registry to resolve this.

* Outdated npm: 
  * Running an outdated version of npm can cause various issues, including compatibility problems. You can update npm using npm install -g npm.

* Version conflicts: 
  * Dependencies in your package.json file might have conflicting version ranges, leading to npm being unable to find a suitable version to install.

* File permission issues: 
  * If you don't have the necessary permissions to write to the node_modules directory or the global npm directory, you may encounter errors.

* File locking conflicts: 
  * If you have another process running that locks your package.json or package-lock.json files, npm may fail to install dependencies.

* Invalid package names or URLs: 
  * If a dependency has an invalid package name or URL, npm won't be able to locate and install it.

* Disk space issues: 
  * Insufficient disk space can cause npm to fail when trying to install packages.

* Malformed or corrupt cache: 
  * npm stores packages in its cache directory. Corrupted or malformed cached data can lead to installation errors. You can clear the cache using npm cache clean -f.

* Dependency resolution issues: 
  * In some cases, npm might not be able to resolve dependency trees, especially when you have a complex set of dependencies with conflicting requirements.

* Post-install scripts: 
  * If a package has a post-install script that fails, it can cause the installation process to fail.

* Operating system-specific issues:
  * Some packages have platform-specific dependencies, and if these aren't met on your system, you may encounter errors.

* Memory issues: 
  * Installing a large number of dependencies or large packages can lead to memory-related errors. You can try increasing your system's available memory or use tools like npm ci for a more efficient installation process.




