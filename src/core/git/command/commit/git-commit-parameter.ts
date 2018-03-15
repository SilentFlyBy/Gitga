import { LongParameter, KeyValueParameter } from "../../parameter";
import { ICommitCommand } from "./git-commit-command";

const commitCommandType: ICommitCommand = {gitCommand: "commit", commitCommand: {}};

export class CommitParam {
    public All: LongParameter<ICommitCommand> = new LongParameter("all", commitCommandType);
    public Patch: LongParameter<ICommitCommand> = new LongParameter("patch", commitCommandType);
    public Short: LongParameter<ICommitCommand> = new LongParameter("short", commitCommandType);
    public Branch: LongParameter<ICommitCommand> = new LongParameter("branch", commitCommandType);
    public Porcelain: LongParameter<ICommitCommand> = new LongParameter("porcelain", commitCommandType);
    public Long: LongParameter<ICommitCommand> = new LongParameter("long", commitCommandType);
    public Null: LongParameter<ICommitCommand> = new LongParameter("null", commitCommandType);
    public Signoff: LongParameter<ICommitCommand> = new LongParameter("signoff", commitCommandType);
    public NoVerify: LongParameter<ICommitCommand> = new LongParameter("no-verify", commitCommandType);
    public ReuseMessage(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("reuse-message", val, commitCommandType);
    }
    public ReeditMessage(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("reedit-message", val, commitCommandType);
    }
    public Fixup(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("fixup", val, commitCommandType);
    }
    public Squash(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("squash", val, commitCommandType);
    }
    public ResetAuthor(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("reset-author", val, commitCommandType);
    }
    public File(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("file", val, commitCommandType);
    }
    public Author(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("author", val, commitCommandType);
    }
    public Date(val: Date): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("date", val.toDateString(), commitCommandType);
    }
    public Message(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("message", val, commitCommandType);
    }
    public Template(val: string): KeyValueParameter<ICommitCommand> {
        return new KeyValueParameter("template", val, commitCommandType);
    }
}
