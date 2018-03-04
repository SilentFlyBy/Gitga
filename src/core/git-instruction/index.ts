export * from "./git-instruction-runner";
export * from "./git-instruction-validator";

export enum GitCommand {
    Commit = "commit",
    Log = "log",
    Status = "status",
}

export interface IGitCommandParameter {
    Key: string;
    Value?: string;
}

export interface IGitInstruction {
    Command: GitCommand;
    Parameters: IGitCommandParameter[];
}
