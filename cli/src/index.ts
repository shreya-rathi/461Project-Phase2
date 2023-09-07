import { program } from 'commander';
// import commands from file path once created

program
    .version('0.0.1')
    .description('Command Line Interface for grading packages');

// add commands to program

program.parse(process.argv)