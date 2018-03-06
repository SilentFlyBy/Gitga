import {IShortParameter, ILongParameter, IKeyValueParameter, ICommitCommand} from "../"

export class CommitParam {
    public static All: ILongParameter<ICommitCommand> = {Key: "all", Type: {}};
    public static Patch: ILongParameter<ICommitCommand> = {Key: "patch", Type: {}}
    public static ReuseMessage(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "reuse-message",
            Value: val,
            Type: {}
        };
    }
    public static ReeditMessage(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "reedit-message",
            Value: val,
            Type: {}
        };
    }
    public static Fixup(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "fixup",
            Value: val,
            Type: {}
        };
    }
    public static Squash(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "squash",
            Value: val,
            Type: {}
        };
    }
    public static ResetAuthor(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "reset-author",
            Value: val,
            Type: {}
        };
    }
    public static Short: ILongParameter<ICommitCommand> = {Key: "short", Type: {}}
    public static Branch: ILongParameter<ICommitCommand> = {Key: "branch", Type: {}}
    public static Porcelain: ILongParameter<ICommitCommand> = {Key: "porcelain", Type: {}}
    public static Long: ILongParameter<ICommitCommand> = {Key: "long", Type: {}}
    public static Null: ILongParameter<ICommitCommand> = {Key: "null", Type: {}}
    public static File(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "file",
            Value: val,
            Type: {}
        };
    }
    public static Author(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "author",
            Value: val,
            Type: {}
        };
    }
    public static Date(val: Date): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "date",
            Value: val.toDateString(),
            Type: {}
        };
    }
    public static Message(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "message",
            Value: val,
            Type: {}
        };
    }
    public static Template(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "template",
            Value: val,
            Type: {}
        };
    }
    public static Signoff: ILongParameter<ICommitCommand> = {Key: "signoff", Type: {}}
    public static NoVerify: ILongParameter<ICommitCommand> = {Key: "no-verify", Type: {}}
}