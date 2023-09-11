import { Command } from "commander";
import { readFileSync } from "fs";

export function urlFileCommand() {
    const urlFilePath = new Command();

    urlFilePath
        .arguments('<filePath>')
        .description("Parses a file of URLs and return the metrics for each URL")
        .action((filePath) => {
        
            console.log("Parsing the file...");

            try {
                const fileContent = readFileSync("filePath", "utf-8");
                const urls = fileContent.split("\n").map(url => url.trim()).filter(url => url.length > 0);
                
                urls.forEach(url => { 
                    url_handler(url);
                })

            } catch (error) {
                console.log(error);
                process.exit(1);
            }
        })

    return urlFilePath;
}