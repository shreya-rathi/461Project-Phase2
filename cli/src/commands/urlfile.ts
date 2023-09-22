// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.1
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for parsing user input for file URL
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { Command } from 'commander';
import { Package } from '../package';
import { NPM_handler } from "../handlers";
import { readFileSync } from "fs";
import { url_handler } from '../url_handler';

export function urlFileCommand() {
    const urlFilePath = new Command('URL_FILE');
  
    urlFilePath
        .arguments('<filePath>')
        .description("Parses a file of URLs and return the metrics for each URL")
        .action((filePath) => {

            try {
                const fileContent = readFileSync("filePath", "utf-8");
                const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);

                urls.forEach(url => { 
                    url_handler(url);
                })
              
              // place urls into list
              
               //We have the file of URLs passed in through the command line
                let pkgs = create_packages(urls); 
                let scores = score_packages(pkgs); // returns json with format {"url": Score} 
              
                    // output_scores(scores);


            } catch (error) {
                console.log(error);
                process.exit(1);
            }
        })

    return urlFilePath;
}

function get_urls(file_name: string)
{
  let urls: Array<string> = []

  return urls;
}

function create_packages(urls: Array<string>) : Array<Package>
{ 
  let pkgs = [];
  for (let i = 0; i < urls.length; i++)
  {
    let p = new Package(urls[i]);
    pkgs.push(p);
  }

  return pkgs;
}

function score_packages(pkgs : Array<Package>)
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
/*
function output_scores(scores: Array<Score>)
{
  scores.forEach((s) =>
    {
      s.print();
    });
}
*/