import { IGitCommand, IGitArgument } from "../git-command";

export interface ICheckoutCommand extends IGitCommand {
    resetCommand: any;
    (val: string): () => void;
}

export class CheckoutArgument implements IGitArgument<ICheckoutCommand> {
    public gitArgument: any;
    public branch?: string;
    public pathSpec?: string;

    public toString(): string {
        throw new Error("Method not implemented.");
    }
}
