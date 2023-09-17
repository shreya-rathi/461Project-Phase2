import { Command } from 'commander';
import { Package } from '../package';
import { NPM_handler } from "../handlers";
//import fs from 'fs';

export function urlFileCommand() {
  const urlFile = new Command('URL_FILE');

  urlFile
    .arguments('<file>')
    .description('Process a file containing a list of URLs')
    .action((file) => {
      console.log(`Processing URL file:`); //  ${file}
      // Implement the logic to process the URL file here
      /*if (fs.existsSync(file)) {
        const urls = fs.readFileSync(file, 'utf-8').split('\n').filter(Boolean);
        urls.forEach((url) => {
          console.log(`Processing URL: ${url}`);
          // Implement the logic to process each URL here
        });
      } else {
        console.error(`File not found: ${file}`);
        process.exit(1);
      }*/


      //We have the file of URLs passed in through the command line
      let urls = get_urls(file); // --> functionality is written in url_handler.ts
      let pkgs = create_packages(urls); 
      let scores = score_packages(pkgs); // returns json with format {"url": Score} 
      
      // When urlFile's action is performed it will return an object with url, Score object pairs to be processed
      //    either by the main executable or we can have it print out the scores here.
      
      // output_scores(scores);
      // OR
      // return scores;
      
    });

  return urlFile;
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

