// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.1
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for parsing user input for file URL
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { Command, program } from 'commander';
import { Package } from '../PKG';
//import { NPM_handler } from "../handlers";
import { readFileSync } from "fs";

export function urlFileCommand() {
    //const urlFilePath = new Command();
  
    program
        .arguments('<filePath>')
        .description("Parses a file of URLs and return the metrics for each URL")
        .action((filePath) => {

            try {
                const fileContent = readFileSync("filePath", "utf-8");
                const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
/*
                urls.forEach(url => { 
                    url_handler(url);
                })
              */
              // place urls into list
            } catch (error) {
                console.log(error);
                process.exit(1);
            }
        })

    program.parse(process.argv);
    //return urlFilePath;
}
/*
function get_urls(file_name: string)
{
  let urls: Array<string> = []

  return urls;
}

export function create_packages(urls: Array<string>) : Array<Package>
{ 
  let pkgs = [];
  for (let i = 0; i < urls.length; i++)
  {
    let p = new Package(urls[i], "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");
    pkgs.push(p);
  }

  return pkgs;
}

export function score_packages(pkgs : Array<Package>)
{
  let npm_handler = new NPM_handler();

  let scores: any = {};

  
  for (let i = 0; i < pkgs.length; i++)
  {
    if (pkgs[i].get_domain() == "npm")
    {
      let s = npm_handler.evaluate(pkgs[i]);
      scores[pkgs[i].get_url()] = s;
    }
    else {}
  }
  return scores;
}

export function output_scores(scores: Array<any>)
{
  scores.forEach((s) =>
    {
      s.print();
    });
}
*/