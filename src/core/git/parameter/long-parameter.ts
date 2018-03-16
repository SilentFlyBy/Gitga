import {IParameter} from "./";
import { GitCommandType } from "../command/git-command";

export class LongParameter<T extends GitCommandType> implements IParameter<T> {
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
