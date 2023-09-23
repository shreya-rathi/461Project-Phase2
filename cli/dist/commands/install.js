"use strict";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.2
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for installing dependencies
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Object.defineProperty(exports, "__esModule", { value: true });
exports.installCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
const ProgressBar = require("progress");
function installCommand() {
    const install = new commander_1.Command('install');
    install
        .description("Installs any dependencies in userland")
        .action(() => {
        console.log("Installing dependencies...");
        const totalPackages = 7; // Estimate the total number of packages to be installed
        const bar = new ProgressBar(':bar :percent', { total: totalPackages });
        let installedPackages = 0;
        const npmInstall = (0, child_process_1.exec)('npm install jest chalk commander progress isomorphic-git dotenv typescript @types/node');
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
            }
            else {
                bar.update(1);
                console.log('\nInstallation completed successfully');
            }
        });
    });
    return install;
}
exports.installCommand = installCommand;
