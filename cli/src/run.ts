import { Command } from "commander";
import { Package } from "./PKG";
import { installCommand } from './commands/install';
import { testCommand } from './commands/test';
import { readFileSync } from "fs";
import { NetScore } from "./metrics";

export function CLI() {
    const program = new Command();
    const figlet = require("figlet");
    console.log(figlet.textSync("Package Management Rating System"));

    program
        .version("0.0.1")
        .description("CLI for package management rating system");

    program.addCommand(installCommand());

    program
        .arguments('<filePath>')
        .description("Parses a file of URLs and return the metrics for each URL")
        .action(async(filePath: string) => {
            type metrics = {
                NET_SCORE: number,
                LICENSE_SCORE: number,
                CORRECTNESS_SCORE: number,
                RAMP_UP_SCORE: number,
                RESPONSIVE_MAINTAINER_SCORE: number,
                BUS_FACTOR_SCORE: number
            }
            try {
                const fileContent = readFileSync("filePath", "utf-8");
                const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
                // create a list of packages
                let packages: Package[] = [];

                urls.forEach(url => { 
                    const pckg = new Package(url, "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");
                    packages.push(pckg);
                })

                packages.forEach(pckg => {
                    /*
                    const bus_factor_score = new BusFactor();
                    const correctness_score = new Correctness();
                    const license_score = new License();
                    const ramp_up_score = new RampUp();
                    const responsiveness_score = new ResponsiveMaintainer();
                    */
                    const net_score = new NetScore();
                    /*
                    pckg.CorrectnessScore = correctness_score.score(pckg);
                    pckg.BusFactorScore = bus_factor_score.score(pckg);
                    //pckg.LicenseScore = license_score.score(pckg);
                    pckg.RampUpScore = ramp_up_score.score(pckg);
                    pckg.MaintenanceScore = responsiveness_score.score(pckg);
                    */
                    pckg.Netscore = net_score.score(pckg);
                })

                // print out the metrics for each package
                /*
                packages.forEach(pckg => {
                    console.log(pckg.url);
                    console.log("NET_SCORE: " + pckg.Netscore);
                    //console.log("LICENSE_SCORE: " + pckg.LicenseScore);
                    console.log("CORRECTNESS_SCORE: " + pckg.CorrectnessScore);
                    console.log("RAMP_UP_SCORE: " + pckg.RampUpScore);
                    console.log("RESPONSIVE_MAINTAINER_SCORE: " + pckg.MaintenanceScore);
                    console.log("BUS_FACTOR_SCORE: " + pckg.BusFactorScore);
                    console.log("NET_SCORE: " + pckg.Netscore);
                })
                */
            } catch (error) {
                console.log(error);
                process.exit(1);
            }
        })
    
    program.addCommand(testCommand());
    program.parse(process.argv);
}


//const mv_dir = exec('cp dist/run.js dist/run');
//const executable = exec('chmod +x dist/run');
//const npm_build = exec('npm run build');
//const npm_start = exec('npm start');

