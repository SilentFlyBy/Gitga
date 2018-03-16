import { IGitCommand, IGitArgument } from "../git-command";

export interface IResetCommand extends IGitCommand {
    resetCommand: any;
}

export class ResetArgument implements IGitArgument<IResetCommand> {
    public gitArgument: any;
    public pathSpec: string;

    constructor(pathSpec?: string) {
        this.pathSpec = pathSpec;
    }
    public toString(): string {
        return this.pathSpec;
    }
}
