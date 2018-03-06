import {IParameter} from "./";

export class GitCommand<T extends IGitCommand> {
    public constructor() {
        this.Parameters = [];
    }

    private Parameters: IParameter<T>[];
    private Type: T;

    public Params(params: IParameter<T>[]) {
        this.Parameters = params;
        return this;
    }
}


export interface IGitCommand {}
export interface ICommitCommand extends IGitCommand {}
export interface IStatusCommand extends IGitCommand {}
