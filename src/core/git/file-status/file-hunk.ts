import { FileLine } from "./file-line";

interface IFileHunk {
    Lines: FileLine[];
}

export type FileHunk = IFileHunk;
