export interface IFileStatus {
    Path1: string;
    Path2?: string;
    IndexStatus: Status;
    WorkTreeStatus: Status;
}

export enum Status {
    Untracked,
    Ignored,
    Added,
    Deleted,
    Modified,
    Renamed,
    Copied,
    Updated,
    None,
}
