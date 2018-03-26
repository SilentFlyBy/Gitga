import { IGitArgument } from "../git-command";

export const ResetCommand = "GIT_RESET";
export type ResetCommand = typeof ResetCommand;

export class ResetArgument implements IGitArgument<ResetCommand> {
    public type: ResetCommand;
    public pathSpec: string;
    public branch: string;

    constructor(branch?: string, pathSpec?: string) {
        this.branch = branch;
        this.pathSpec = pathSpec;
    }
    public toString(): string {
        return [this.branch, this.pathSpec].join(" ");
    }
}
