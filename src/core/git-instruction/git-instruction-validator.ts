import {GitCommand, IGitCommandParameter, IGitInstruction} from "./";

export class GitInstructionValidator {
    private commandDefinitions: IGitCommandDefinition[];

    constructor() {
        this.commandDefinitions.push(this.SetupStatusCommand());
    }

    public ValidateInstruction(instruction: IGitInstruction): boolean {
        const commandParameters = this.GetParametersForCommand(instruction.Command);

        for (const p of instruction.Parameters) {
            for (const cp of commandParameters) {
                if (p.Key === cp.Short) {
                    return true;
                }
                if (p.Key === cp.Long) {
                    return true;
                }
                if (cp.KeyValue) {
                    if (p.Key === cp.KeyValue.Key) {
                        const regex = new RegExp(cp.KeyValue.ValueRegex);
                        if (regex.test(p.Value)) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private GetParametersForCommand(command: GitCommand): IGitParameter[] {
        return null;
    }

    private SetupStatusCommand(): IGitCommandDefinition {
        const parameters = [] as IGitParameter[];

        parameters.push({Short: "s", Long: "short"});
        parameters.push({Short: "b", Long: "branch"});
        parameters.push({Long: "show-stash"});
        parameters.push({KeyValue: {Key: "porcelain", ValueRegex: "^(.*)$"}});
        parameters.push({Long: "long"});
        parameters.push({Short: "v", Long: "verbose"});
        parameters.push({KeyValue: {Key: "untracked-files", ValueRegex: "^(?:no|normal|all)$"}});
        parameters.push({KeyValue: {Key: "ignore-submodules", ValueRegex: "^(?:none|untracked|dirty|all)$"}});
        parameters.push({KeyValue: {Key: "ignored", ValueRegex: "^(?:traditional|no|matching)$"}});
        parameters.push({Short: "z"});
        parameters.push({KeyValue: {Key: "column", ValueRegex: "^(.*)$"}});

        return {command: GitCommand.Status, parameters};
    }
}

interface IGitParameter {
    Short?: string;
    Long?: string;
    KeyValue?: IKeyValueParameter;
}

interface IGitCommandDefinition {
    command: GitCommand;
    parameters: IGitParameter[];
}

interface IKeyValueParameter {
    Key: string;
    ValueRegex: string;
}
