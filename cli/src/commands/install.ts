import { Command } from 'commander';

// this is all just an example

function install_command() {
    console.log("Installing...");
}

export default function configure_install_command(program: Command) {
    program
        .command("install")
        .description("Installs the program")
        .action(install_command);
}
