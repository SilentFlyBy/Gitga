import {ChildProcess} from "child_process";
import {IParameter} from "../parameter";
import {GitCommandRunner} from "./";

export class GitCommand<T extends IGitCommand> {
    private command: string;
    private Type: T;
    private parameters: Array<IParameter<T>>;

    public constructor(comm: string) {
        this.parameters = [];
        this.command = comm;
    }

    get Command(): string {
        return this.command;
    }
    get CommandParameters(): Array<IParameter<T>> {
        return this.parameters;
    }

    public async Execute(): Promise<string> {
        return await GitCommandRunner.RunCommand<T>(this);
    }
    public Params(params: Array<IParameter<T>>) {
        this.parameters = params;
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
