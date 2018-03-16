import { StatusCommand } from "./git-status-command";
import { LongParameter, KeyValueParameter } from "../../parameter";

export class StatusParam {
    public Short: LongParameter<StatusCommand> = new LongParameter("short", StatusCommand);
    public Porcelain: LongParameter<StatusCommand> = new LongParameter("porcelain", StatusCommand);
    public UntrackedFiles(val: string): KeyValueParameter<StatusCommand> {
        return new KeyValueParameter<StatusCommand>("untracked-files", val, StatusCommand);
    }
}
