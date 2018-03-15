import { IGitCommand, GitCommand } from "./command/git-command";

export class GitCommandBuilder {
    public static BuildCommand<T extends IGitCommand>(command: GitCommand<T>): string {
        const commandString = command.Command;
        const argString = command.Argument.toString();
        let parameterString = "";

        for (const param of command.CommandParameters) {
            if (parameterString.length === 0) {
                parameterString = param.ToParameterString();
            } else {
                parameterString = `${parameterString} ${param.ToParameterString()}`;
            }
        }

        if (argString && argString.length > 0) {
            return `${commandString} ${parameterString} ${argString}`;
        }

        return `${commandString} ${parameterString}`;
    }
}
