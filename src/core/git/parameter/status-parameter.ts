import {IStatusCommand} from "../command";
import {KeyValueParameter, LongParameter} from "./";

const statusCommandType: IStatusCommand = {gitCommand: "status", statusCommand: {}};

export class StatusParam {
    public Short: LongParameter<IStatusCommand> = new LongParameter("short", statusCommandType);
}
