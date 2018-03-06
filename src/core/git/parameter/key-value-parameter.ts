import { IParameter } from ".";
import { IGitCommand } from "../command";

export class KeyValueParameter<T extends IGitCommand> implements IParameter<T> {
    public Key: string;
    public Value: string;
    public Type: T;

    public constructor(key: string, val: string, type: T) {
        this.Key = key;
        this.Value = val;
        this.Type = type;
    }

    public ToParameterString(): string {
        return `--${this.Key}=${this.Value}`;
    }
}
