import { Command } from 'commander';
import { exec } from 'child_process';
//import { runCLI } from 'jest';

export function testCommand() {
  const test = new Command('test');

  test
    .description('Runs a test suite')
    .action(() => {
      console.log('Running test suite...');

      // Execute the test suite with Jest command for testing and coverage calculation
      exec('jest "path/to/your/test/files" --json --coverage', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing test suite: ${error.message}`);
          process.exit(1);
        }

        try {
          const jestOutput = JSON.parse(stdout);

          const totalTests = jestOutput.numTotalTests;
          const passedTests = jestOutput.numPassedTests;
          const lineCoverage = jestOutput.coverageMap.total.lines.pct;

          console.log(`${passedTests}/${totalTests} test cases passed. ${lineCoverage}% line coverage achieved.`);

          // Exit with code 0 if the minimum requirement met, otherwise exit with code 1
          if (passedTests >= 20 && lineCoverage >= 80) {
            process.exit(0);
          } else {
            process.exit(1);
          }
        } catch (parseError) {
          //console.error(`Error parsing test output: ${parseError.message}`);
          process.exit(1);
        }
      });
    });

  return test;
}
