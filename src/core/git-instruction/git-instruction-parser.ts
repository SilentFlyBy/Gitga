import * as GC from "./";
import { GitInstructionValidator } from "./";

export class GitInstructionParser {
    public ParseInstructionString(command: string): GC.IGitInstruction {
        const parts = command.split(" ");
        const commandString = parts[0];
        const gitCommand = commandString as  GC.GitCommand;

        const gitInstruction = {Parameters: []} as GC.IGitInstruction;
        const validator = new GitInstructionValidator();

        if (!gitCommand) {
            throw new TypeError(`A git command named '${commandString}' doesn't exist.`);
        }

        gitInstruction.Command = gitCommand;

        for (const parameter of parts) {
            if (parameter.substring(0, 1) !== "-") {
                throw new SyntaxError("Parameters have to start with at least one hyphen ('-' or '--'");
            }

            const gitCommandParameter = {} as GC.IGitCommandParameter;

            if (parameter.substring(1, 2) === "-") {
                // long parameter or key-value parameter

                const pair = parameter.split("=");
                if (pair.length > 1) {
                    // Key-value parameter
                    gitCommandParameter.Key = pair[0].substring(2);
                    gitCommandParameter.Value = pair[1];

                } else {
                    // Long parameter

                    gitCommandParameter.Key = parameter.substring(2);
                }
            } else {
                // Short parameter

                gitCommandParameter.Key = parameter.substring(1);
            }

            gitInstruction.Parameters.push(gitCommandParameter);
        }

        if (!validator.ValidateInstruction(gitInstruction)) {
            throw new SyntaxError("Instruction parameters not correct");
        }

        return gitInstruction;
    }
}
