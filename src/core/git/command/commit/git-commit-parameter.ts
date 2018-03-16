import { LongParameter, KeyValueParameter } from "../../parameter";
import { CommitCommand } from "./git-commit-command";

export class CommitParam {
    public All: LongParameter<CommitCommand> = new LongParameter("all", CommitCommand);
    public Patch: LongParameter<CommitCommand> = new LongParameter("patch", CommitCommand);
    public Short: LongParameter<CommitCommand> = new LongParameter("short", CommitCommand);
    public Branch: LongParameter<CommitCommand> = new LongParameter("branch", CommitCommand);
    public Porcelain: LongParameter<CommitCommand> = new LongParameter("porcelain", CommitCommand);
    public Long: LongParameter<CommitCommand> = new LongParameter("long", CommitCommand);
    public Null: LongParameter<CommitCommand> = new LongParameter("null", CommitCommand);
    public Signoff: LongParameter<CommitCommand> = new LongParameter("signoff", CommitCommand);
    public NoVerify: LongParameter<CommitCommand> = new LongParameter("no-verify", CommitCommand);
    public ReuseMessage(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("reuse-message", val, CommitCommand);
    }
    public ReeditMessage(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("reedit-message", val, CommitCommand);
    }
    public Fixup(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("fixup", val, CommitCommand);
    }
    public Squash(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("squash", val, CommitCommand);
    }
    public ResetAuthor(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("reset-author", val, CommitCommand);
    }
    public File(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("file", val, CommitCommand);
    }
    public Author(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("author", val, CommitCommand);
    }
    public Date(val: Date): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("date", val.toDateString(), CommitCommand);
    }
    public Message(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("message", val, CommitCommand);
    }
    public Template(val: string): KeyValueParameter<CommitCommand> {
        return new KeyValueParameter("template", val, CommitCommand);
    }
}
