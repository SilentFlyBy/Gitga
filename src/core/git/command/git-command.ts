import {ChildProcess} from "child_process";
import {IParameter} from "../parameter";
import {GitCommandRunner} from "./";

export class GitCommand<T extends IGitCommand> {
    private command: string;
    private Type: T;
    private parameters: Array<IParameter<T>>;
    private argument: string;

    public constructor(comm: string, arg?: string) {
        this.parameters = [];
        this.command = comm;
        this.argument = arg;
    }

    get Command(): string {
        return this.command;
    }
    get CommandParameters(): Array<IParameter<T>> {
        return this.parameters;
    }
    get Argument(): string {
        return this.argument;
    }

    public async Execute(): Promise<string> {
        return await GitCommandRunner.RunCommand<T>(this);
    }
    public Params(params: Array<IParameter<T>>) {
        this.parameters = params;
        return this;
    }

    public Args(args: string) {
        this.argument = args;
        return this;
    }
}

export interface IGitCommand {
    gitCommand: string;
}
export interface ICommitCommand extends IGitCommand {
    commitCommand: any;
}
export interface IStatusCommand extends IGitCommand {
    statusCommand: any;
}

export interface IAddCommand extends IGitCommand {
    addCommand: any;
}

export interface IRemoveCommand extends IGitCommand {
    removeCommand: any;
}

export interface IResetCommand extends IGitCommand {
    resetCommand: any;
}
