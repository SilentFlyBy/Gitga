import { IGitArgument } from "../git-command";

export const CheckoutCommand = "GIT_CHECKOUT";
export type CheckoutCommand = typeof CheckoutCommand;

export class CheckoutArgument implements IGitArgument<CheckoutCommand> {
    public type: CheckoutCommand;
    public branch?: string;
    public pathSpec?: string;

    constructor(branch?: string, pathSpec?: string) {
        this.branch = branch;
        this.pathSpec = pathSpec;
    }

    public toString(): string {
        return [this.branch, this.pathSpec].join(" ");
    }
}
