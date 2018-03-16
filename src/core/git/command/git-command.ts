import {ChildProcess} from "child_process";
import {IParameter} from "../parameter";
import { GitCommandRunner } from "../git-command-runner";
import { CommitCommand } from "./commit/git-commit-command";
import { ResetCommand } from "./reset/git-reset-command";
import { StatusCommand } from "./status/git-status-command";
import { AddCommand } from "./add/git-add-command";
import { CheckoutCommand } from "./checkout/git-checkout-command";
import { RemoveCommand } from "./remove/git-remove-command";

export class GitCommand<T extends GitCommandType> {
    private command: string;
    private Type: T;
    private parameters: Array<IParameter<T>>;
    private argument: IGitArgument<T>;

    public constructor(comm: string, arg?: IGitArgument<T>) {
        this.parameters = [];
        this.command = comm;

        if (!arg) {
            this.argument = {
                type: undefined,
                toString: () => "",
            };
        } else {
            this.argument = arg;
        }
    }

    get Command(): string {
        return this.command;
    }
    get CommandParameters(): Array<IParameter<T>> {
        return this.parameters;
    }
    get Argument(): IGitArgument<T> {
        return this.argument;
    }

    public async Execute(): Promise<string> {
        return await GitCommandRunner.RunCommand<T>(this);
    }
    public Params(params: Array<IParameter<T>>) {
        this.parameters = params;
        return this;
    }

    public Args(args: IGitArgument<T>) {
        this.argument = args;
        return this;
    }
}

export interface IGitArgument<T> {
    type: T;
    toString(): string;
}

export type GitCommandType =
    CommitCommand
    | ResetCommand
    | StatusCommand
    | AddCommand
    | CheckoutCommand
    | RemoveCommand;
