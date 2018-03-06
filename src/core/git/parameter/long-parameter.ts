import {IGitCommand} from "../command";
import {IParameter} from "./";

export class LongParameter<T extends IGitCommand> implements IParameter<T> {
    public Key: string;
    public Type: T;

    public constructor(key: string, type: T) {
        this.Key = key;
        this.Type = type;
    }

    public ToParameterString(): string {
        return `--${this.Key}`;
    }
}
