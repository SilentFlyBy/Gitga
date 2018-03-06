import {GitCommand, ICommitCommand, IStatusCommand} from "./command";
import {CommitParam, StatusParam} from "./parameter";

export class Git {
    public static CommitParam: CommitParam = new CommitParam();
    public static StatusParam: StatusParam = new StatusParam();

    public static Commit(): GitCommand<ICommitCommand> {
        return new GitCommand<ICommitCommand>("commit");
    }
    public static Status(): GitCommand<IStatusCommand> {
        return new GitCommand<IStatusCommand>("status");
    }
}
