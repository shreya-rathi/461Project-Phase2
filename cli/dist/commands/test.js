"use strict";
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.1
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for testing for code coverage
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
Object.defineProperty(exports, "__esModule", { value: true });
exports.testCommand = void 0;
const commander_1 = require("commander");
const child_process_1 = require("child_process");
//import chalk from 'chalk'; // For styling console output
function testCommand() {
    const test = new commander_1.Command('test');
    test
        .description('Runs a test suite')
        .action(() => {
        //const chalk = require('chalk');
        console.log('Running test suite...'); //chalk.blue('Running test suite...'));
        // Execute the test suite with Jest command for testing and coverage calculation
        (0, child_process_1.exec)('./node_modules/.bin/jest "cli/tests" --json --coverage', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing test suite: ${error.message}`);
                process.exit(1);
            }
            try {
                const jestOutput = JSON.parse(stdout);
                const totalTests = jestOutput.numTotalTests;
                const passedTests = jestOutput.numPassedTests;
                // Extract coverage data
                const { lines, statements, functions, branches } = jestOutput.coverageMap.total;
                console.log(`${passedTests}/${totalTests} test cases passed.`);
                // Print out coverage table
                console.table({
                    'Lines': `${lines.pct}%`,
                    'Statements': `${statements.pct}%`,
                    'Functions': `${functions.pct}%`,
                    'Branches': `${branches.pct}%`,
                });
                // Exit with code 0 if the minimum requirement met, otherwise exit with code 1
                if (passedTests >= 20 && lines.pct >= 80) {
                    process.exit(0);
                }
                else {
                    console.log("Failed to meet minimum coverage or test criteria.");
                    process.exit(1);
                }
            }
            catch (parseError) {
                console.error(`Error parsing test output: ${parseError.message}`);
                process.exit(1);
            }
        });
    });
    return test;
}
exports.testCommand = testCommand;
