import { AddCommand } from "./git-add-command";
import { LongParameter } from "../../parameter";

export class AddParam {
    public DryRun: LongParameter<AddCommand> = new LongParameter("dry-run", AddCommand);
}
