import {IParameter} from "./";

export class GitCommand<T extends IGitCommand> {
    private Parameters: Array<IParameter<T>>;
    private Type: T;

    public constructor() {
        this.Parameters = [];
    }

    public Params(params: Array<IParameter<T>>) {
        this.Parameters = params;
        return this;
    }
}

export interface IGitCommand {
    gitCommand: {};
}
export interface ICommitCommand extends IGitCommand {
    commitCommand: any;
}
export interface IStatusCommand extends IGitCommand {
    statusCommand: {};
}
