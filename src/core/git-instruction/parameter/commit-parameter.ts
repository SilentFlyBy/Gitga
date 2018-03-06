import {ICommitCommand, IKeyValueParameter, ILongParameter, IShortParameter} from "../";

const commitCommandType: ICommitCommand = {gitCommand: {}, commitCommand: {}};

export class CommitParam {
    public static All: ILongParameter<ICommitCommand> = {Key: "all", Type: commitCommandType};
    public static Patch: ILongParameter<ICommitCommand> = {Key: "patch", Type: commitCommandType};
    public static Short: ILongParameter<ICommitCommand> = {Key: "short", Type: commitCommandType};
    public static Branch: ILongParameter<ICommitCommand> = {Key: "branch", Type: commitCommandType};
    public static Porcelain: ILongParameter<ICommitCommand> = {Key: "porcelain", Type: commitCommandType};
    public static Long: ILongParameter<ICommitCommand> = {Key: "long", Type: commitCommandType};
    public static Null: ILongParameter<ICommitCommand> = {Key: "null", Type: commitCommandType};
    public static Signoff: ILongParameter<ICommitCommand> = {Key: "signoff", Type: commitCommandType};
    public static NoVerify: ILongParameter<ICommitCommand> = {Key: "no-verify", Type: commitCommandType};
    public static ReuseMessage(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "reuse-message",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static ReeditMessage(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "reedit-message",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static Fixup(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "fixup",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static Squash(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "squash",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static ResetAuthor(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "reset-author",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static File(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "file",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static Author(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "author",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static Date(val: Date): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "date",
            Type: commitCommandType,
            Value: val.toDateString(),
        };
    }
    public static Message(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "message",
            Type: commitCommandType,
            Value: val,
        };
    }
    public static Template(val: string): IKeyValueParameter<ICommitCommand> {
        return {
            Key: "template",
            Type: commitCommandType,
            Value: val,
        };
    }
}
