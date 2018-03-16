import { IGitArgument } from "../git-command";

export const StatusCommand = "GIT_STATUS";
export type StatusCommand = typeof StatusCommand;

export class StatusArgument implements IGitArgument<StatusCommand> {
    public type: StatusCommand;
    public pathspec?: string;

    constructor(pathSpec?: string) {
        this.pathspec = pathSpec;
    }

    public toString(): string {
        return this.pathspec;
    }
}
