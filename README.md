# ECE461Project
# Andrew Kreimer
# Ethan Burmane
# Ashwin Sreedhar
# Jonah Nichols
# Onyekwere Toby

## npm

### npm install

#### Possible Errors

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

## GitHub API
* We will use the GitHub APIs to gather metadata for our metric calculations
* Examples of information to gather:
 * Length of documentation
 * Number of contributors
 * Average number of contributors for past x weeks
 * 

### Documentation
* REST API: https://docs.github.com/en/rest?apiVersion=2022-11-28
* Graph QL: https://docs.github.com/en/graphql

## npm API
* We will use the npm API for the same purpose as the GitHub API
* 
### Documentation
* REST API: https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md 
