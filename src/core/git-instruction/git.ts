import * as GC from "./";
import { ICommitCommand, CommitParam, StatusParam } from "./";

export class Git {
    public static Commit(): GC.GitCommand<GC.ICommitCommand> {
        return new GC.GitCommand<GC.ICommitCommand>();
    }
}