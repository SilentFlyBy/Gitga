export interface IFileStatus {
    FileName: string;
    NewFileName?: string;
    Status: Status;
    Staged: boolean;
}

export enum Status {
    Unknown,
    Added,
    Deleted,
    Modified,
    Renamed,
}
