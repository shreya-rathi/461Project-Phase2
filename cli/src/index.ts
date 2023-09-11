import { program } from 'commander';
import install from './commands/install';
// import commands from file path once created

program
    .version('0.0.1')
    .description('Command Line Interface for grading packages');

// add commands to program
install(program);

program.parse(process.argv)