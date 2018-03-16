import { IGitCommand, IGitArgument } from "../git-command";

export interface IResetCommand extends IGitCommand {
    resetCommand: any;
}

export class ResetArgument implements IGitArgument<IResetCommand> {
    public gitArgument: any;
    public pathSpec: string;
    public branch: string;

    constructor(branch?: string, pathSpec?: string) {
        this.branch = branch;
        this.pathSpec = pathSpec;
    }
    public toString(): string {
        return `${this.branch} ${this.pathSpec}`;
    }
}
