import { IGitCommand } from "../command/git-command";
import { IParameter } from ".";

export class ShortParameter<T extends IGitCommand> implements IParameter<T> {
    public Key: string;
    public Type: T;

    constructor(key: string, type: T) {
        this.Key = key;
        this.Type = type;
    }

    public ToParameterString(): string {
        return `-${this.Key}`;
    }
}
