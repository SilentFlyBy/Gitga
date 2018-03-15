import { StatusParam } from "./command/status/git-status-parameter";
import { AddParam } from "./command/add/git-add-parameter";
import { ICommitCommand } from "./command/commit/git-commit-command";
import { IStatusCommand } from "./command/status/git-status-command";
import { IAddCommand } from "./command/add/git-add-command";
import { IRemoveCommand } from "./command/remove/git-remove-command";
import { IResetCommand } from "./command/reset/git-reset-command";
import { ICheckoutCommand } from "./command/checkout/git-checkout-command";
import { GitCommand } from "./command/git-command";
import { CommitParam } from "./command/commit/git-commit-parameter";

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

    public static Checkout(): GitCommand<ICheckoutCommand> {
        return new GitCommand<ICheckoutCommand>("checkout");
    }
}
