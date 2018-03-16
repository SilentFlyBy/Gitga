import { GitCommandType } from "../command/git-command";

export * from "./long-parameter";
export * from "./key-value-parameter";

export interface IParameter<T extends GitCommandType> {
    Key: string;
    Value?: string;
    Type: T;

    ToParameterString(): string;
}
