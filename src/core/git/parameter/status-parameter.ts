import {IStatusCommand} from "../command";
import {KeyValueParameter, LongParameter} from "./";

const statusCommandType: IStatusCommand = {gitCommand: "status", statusCommand: {}};

export class StatusParam {
    public Short: LongParameter<IStatusCommand> = new LongParameter("short", statusCommandType);
    public Porcelain: LongParameter<IStatusCommand> = new LongParameter("porcelain", statusCommandType);
    public UntrackedFiles(val: string): KeyValueParameter<IStatusCommand> {
        return new KeyValueParameter<IStatusCommand>("untracked-files", val, statusCommandType);
    }
}
