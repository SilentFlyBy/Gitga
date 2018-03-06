import {IKeyValueParameter, ILongParameter, IStatusCommand} from "../";

const statusCommandType: IStatusCommand = {gitCommand: {}, statusCommand: {}};

export class StatusParam {
    public static Short: ILongParameter<IStatusCommand> = {Key: "short", Type: statusCommandType};
    public static Test: ILongParameter<IStatusCommand> = {Key: "test", Type: statusCommandType};
}
