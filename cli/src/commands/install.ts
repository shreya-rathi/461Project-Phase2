// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.2
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for installing dependencies
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { Command } from "commander";
import { exec } from "child_process";
import ProgressBar = require("progress");

export function installCommand() {
    const install = new Command('install');

    install
       .description("Installs any dependencies in userland")
       .action(() => {
            console.log("Installing dependencies...");

            //Log here for starting dependency install
           
            const totalPackages = 7; // Estimate the total number of packages to be installed
            const bar = new ProgressBar(':bar :percent', { total: totalPackages });
            let installedPackages = 0;

            const npmInstall = exec('npm install child_process commander figlet progress isomorphic-git dotenv typescript jest chalk @types/node');

            //Log below success/failure of install
           
            if (npmInstall.stdout) {
                npmInstall.stdout.on('data', (data) => {
                    // Here you can parse the data to get more accurate progress (if possible)
                    installedPackages += 1; 
                    bar.tick();
                    if (installedPackages >= totalPackages) {
                        bar.terminate();
                    }
                });
            }

            npmInstall.on('close', (code) => {
                if (code !== 0) {
                    console.error(`\nInstallation process exited with code ${code}`);
                } else {
                    bar.update(1);
                    console.log('\nInstallation completed successfully');
                }
            });
       });
    
    return install;
}
