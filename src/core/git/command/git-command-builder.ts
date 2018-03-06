import {IParameter} from "../parameter";
import {GitCommand, ICommitCommand, IGitCommand} from "./";

export class GitCommandBuilder {
    public static BuildCommand<T extends IGitCommand>(command: GitCommand<T>): string {
        const commandString = command.Command;
        let parameterString = "";

        for (const param of command.CommandParameters) {
            parameterString += " " + param.ToParameterString();
        }

        return `${commandString} ${parameterString}`;
    }
}
