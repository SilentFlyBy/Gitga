import {ILongParameter, IKeyValueParameter, IStatusCommand} from "../";

export class StatusParam {
    public static Short: ILongParameter<IStatusCommand> = {Key: "short", Type: {}}
    public static Test: ILongParameter<IStatusCommand> = {Key: "test", Type: {}}
}