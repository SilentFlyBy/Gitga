import * as GC from "./";
import { CommitParam, ICommitCommand, StatusParam } from "./";

export class Git {
    public static Commit(): GC.GitCommand<GC.ICommitCommand> {
        return new GC.GitCommand<GC.ICommitCommand>();
    }
}
