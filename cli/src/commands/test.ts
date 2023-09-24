// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Version: 1.1
// Date: 09/22/2023
// Author: Ashwin Sreedhar
// Description: CLI command for testing for code coverage
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

import { Command } from 'commander';
import { exec } from 'child_process';
import { runCLI } from 'jest';
//import chalk from 'chalk'; // For styling console output

export function testCommand() {
  const test = new Command('test');

  test
    .description('Runs a test suite')
    .action(async () => {
			const stdout_write = process.stdout.write.bind(process.stdout);
			process.stdout.write = () => true;
			const stderr_write = process.stderr.write.bind(process.stderr);
			process.stderr.write = () => true;

      const config = {
				collectCoverage: true,
				collectCoverageFrom: ["src/**/*.{js,ts}", "!**/node_modules/**"],
				reporters: ["default"],
				silent: true,
				verbose: false,
			};

			const { results } = await runCLI(config as any, [process.cwd()]);

			// Restore stdout and stderr
			process.stdout.write = stdout_write;
			process.stderr.write = stderr_write;

			// Get test results and print them
			const total_tests = results.numTotalTests;
			const passed = results.numPassedTests;
			const coverage = results.coverageMap
				? results.coverageMap.getCoverageSummary().toJSON().lines.pct
				: 0;

			console.log(`Total Tests: ${total_tests}`);
			console.log(`Passed Tests: ${passed}`);
			console.log(`Coverage Perc.: ${coverage}%`);
			console.log(
				`${passed}/${total_tests} test cases passed. ${coverage}% line coverage achieved.`,
			);
      
      
      /*
      () => {
      //const chalk = require('chalk');
      console.log('Running test suite...');//chalk.blue('Running test suite...'));

      // Execute the test suite with Jest command for testing and coverage calculation
      exec('./node_modules/.bin/jest "cli/tests" --json --coverage', (error, stdout, stderr) => {
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
          } else {
            console.log("Failed to meet minimum coverage or test criteria.");
            process.exit(1);
          }
        } catch (parseError: any) {
          console.error(`Error parsing test output: ${parseError.message}`);
          process.exit(1);
        }
      });
      */
    });
  return test;
}
