import { StatusParam } from "./command/status/git-status-parameter";
import { AddParam } from "./command/add/git-add-parameter";
import { CommitCommand } from "./command/commit/git-commit-command";
import { StatusCommand } from "./command/status/git-status-command";
import { AddCommand } from "./command/add/git-add-command";
import { RemoveCommand } from "./command/remove/git-remove-command";
import { ResetCommand } from "./command/reset/git-reset-command";
import { CheckoutCommand } from "./command/checkout/git-checkout-command";
import { GitCommand } from "./command/git-command";
import { CommitParam } from "./command/commit/git-commit-parameter";

export class Git {
    public static CommitParam: CommitParam = new CommitParam();
    public static StatusParam: StatusParam = new StatusParam();
    public static AddParam: AddParam = new AddParam();

    public static Commit(): GitCommand<CommitCommand> {
        return new GitCommand<CommitCommand>("commit");
    }
    public static Status(): GitCommand<StatusCommand> {
        return new GitCommand<StatusCommand>("status");
    }

    public static Add(): GitCommand<AddCommand> {
        return new GitCommand<AddCommand>("add");
    }

    public static Remove(): GitCommand<RemoveCommand> {
        return new GitCommand<RemoveCommand>("rm");
    }

    public static Reset(): GitCommand<ResetCommand> {
        return new GitCommand<ResetCommand>("reset");
    }

    public static Checkout(): GitCommand<CheckoutCommand> {
        return new GitCommand<CheckoutCommand>("checkout");
    }
}
