import { IGitCommand } from "../command/git-command";

export * from "./long-parameter";
export * from "./key-value-parameter";

export interface IParameter<T extends IGitCommand> {
    Key: string;
    Value?: string;
    Type: T;

    ToParameterString(): string;
}
