import { Command } from 'commander';
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
      // let urls = get_urls(file_name); --> functionality is written in url_handler.ts
      // let pkgs = create_packages(urls); --> to be written
      // let scores = score_packages(pkgs); returns json with format {"url": Score} 
      // When urlFile's action is performed it will return an object with url, Score object pairs to be processed
      //    either by the main executable or we can have it print out the scores here.
    });

  return urlFile;
}
