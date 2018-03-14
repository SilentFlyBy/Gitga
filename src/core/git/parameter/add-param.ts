import { LongParameter } from ".";
import { IAddCommand } from "../command";

const addCommandType: IAddCommand = { gitCommand: "add", addCommand: {} };

export class AddParam {
    public DryRun: LongParameter<IAddCommand> = new LongParameter("dry-run", addCommandType);
}
