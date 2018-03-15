import {ChildProcess} from "child_process";
import {IParameter} from "../parameter";
import { GitCommandRunner } from "../git-command-runner";

export class GitCommand<T extends IGitCommand> {
    private command: string;
    private Type: T;
    private parameters: Array<IParameter<T>>;
    private argument: IGitArgument<T>;

    public constructor(comm: string, arg?: IGitArgument<T>) {
        this.parameters = [];
        this.command = comm;

        if (!arg) {
            this.argument = {
                gitArgument: undefined,
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

export interface IGitCommand {
    gitCommand: string;
}

export interface IGitArgument<T extends IGitCommand> {
    gitArgument: any;
    toString(): string;
}
