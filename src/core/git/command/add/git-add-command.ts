import { IGitArgument } from "../git-command";

export const AddCommand = "GIT_ADD";
export type AddCommand = typeof AddCommand;

export class AddArgument implements IGitArgument<AddCommand> {
    public type: AddCommand;
    public pathspec?: string;

    constructor(pathSpec?: string) {
        this.pathspec = pathSpec;
    }

    public toString(): string {
        return this.pathspec;
    }
}
