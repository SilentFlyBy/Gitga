import {GitCommand, ICommitCommand, IStatusCommand, IAddCommand, IRemoveCommand, IResetCommand} from "./command";
import {CommitParam, StatusParam} from "./parameter";
import { AddParam } from "./parameter/add-param";

export class Git {
    public static CommitParam: CommitParam = new CommitParam();
    public static StatusParam: StatusParam = new StatusParam();
    public static AddParam: AddParam = new AddParam();

    public static Commit(): GitCommand<ICommitCommand> {
        return new GitCommand<ICommitCommand>("commit");
    }
    public static Status(): GitCommand<IStatusCommand> {
        return new GitCommand<IStatusCommand>("status");
    }

    public static Add(): GitCommand<IAddCommand> {
        return new GitCommand<IAddCommand>("add");
    }

    public static Remove(): GitCommand<IRemoveCommand> {
        return new GitCommand<IRemoveCommand>("rm");
    }

    public static Reset(): GitCommand<IResetCommand> {
        return new GitCommand<IResetCommand>("reset");
    }
}
