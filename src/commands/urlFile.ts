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
    });

  return urlFile;
}
