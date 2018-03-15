import { IGitCommand, IGitArgument } from "../git-command";

export interface IStatusCommand extends IGitCommand {
    statusCommand: any;
}

export class StatusArgument implements IGitArgument<IStatusCommand> {
    public gitArgument: any;
    public pathspec?: string;

    constructor(pathSpec?: string) {
        this.pathspec = pathSpec;
    }

    public toString(): string {
        return this.pathspec;
    }
}
