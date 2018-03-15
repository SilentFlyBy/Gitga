import { IAddCommand } from "./git-add-command";
import { LongParameter } from "../../parameter";

const addCommandType: IAddCommand = { gitCommand: "add", addCommand: {} };

export class AddParam {
    public DryRun: LongParameter<IAddCommand> = new LongParameter("dry-run", addCommandType);
}
