import { IGitCommand, IGitArgument } from "../git-command";

export interface IAddCommand extends IGitCommand {
    addCommand: any;
}

export class AddArgument implements IGitArgument<IAddCommand> {
    public gitArgument: IAddCommand;
    public pathspec?: string;

    constructor(pathSpec?: string) {
        this.pathspec = pathSpec;
    }

    public toString(): string {
        return this.pathspec;
    }
}
