import {IGitCommand} from "../";

export * from "./commit-parameter";
export * from "./status-parameter";

export interface IParameter<T extends IGitCommand> {
    Key?: string;
    Value?: string;
    Type: T;
}

export interface IKeyValueParameter<T extends IGitCommand> extends IParameter<T> {
    Key: string;
    Value: string;
    Type: T;
}

export interface ILongParameter<T extends IGitCommand> extends IParameter<T> {
    Key: string;
    Type: T;
}

export interface IShortParameter<T extends IGitCommand> extends IParameter<T> {
    Key: string;
    Type: T;
}