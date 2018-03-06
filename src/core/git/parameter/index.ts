import {IGitCommand} from "../command";

export * from "./commit-parameter";
export * from "./status-parameter";
export * from "./short-parameter";
export * from "./long-parameter";
export * from "./key-value-parameter";

export interface IParameter<T extends IGitCommand> {
    Key: string;
    Value?: string;
    Type: T;

    ToParameterString(): string;
}
