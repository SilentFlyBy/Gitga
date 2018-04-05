export const FILE_SELECT = "FILE_SELECT";
export type FILE_SELECT = typeof FILE_SELECT;

export interface IFileSelect {
    type: FILE_SELECT;
    file: string;
}

export type FileAction = IFileSelect;

export function FileSelect(file: string): FileAction {
    return {
        type: FILE_SELECT,
        file,
    };
}
