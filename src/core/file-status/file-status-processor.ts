import {Git} from "../git";
import {IFileStatus, Status} from "./file-status";

export class FileStatusProcessor {
    public static async GetAllFileStates(path?: string): Promise<IFileStatus[]> {
        return new Promise<IFileStatus[]>(async (resolve, reject) => {
            const output = await Git.Status().Params([Git.StatusParam.Porcelain]).Args(path).Execute();
            const fileStatusList: IFileStatus[] = this.ParseStatusLines(output);

            return resolve(fileStatusList);
        });
    }

    public static ParseStatusLines(lines: string): IFileStatus[] {
        const fileStatusList: IFileStatus[] = [];
        lines.split(/\r?\n/).forEach((line) => {
            if (line.length < 1) {
                return;
            }

            const parsedLine = this.ParseStatusLine(line);
            fileStatusList.push(parsedLine);
        });

        return fileStatusList;
    }

    public static ParseStatusLine(line: string): IFileStatus {
        const XIndicator = line.charAt(0);
        const YIndicator = line.charAt(1);
        const fileString = line.substring(3);

        let path2;
        const splitByArrow = fileString.split(/\s\-\>\s/);
        const path1 = splitByArrow[0];

        if (splitByArrow.length > 1) {
            path2 = splitByArrow[1];
        }

        const xStatus = this.GetStatusFromIndicator(XIndicator);
        const yStatus = this.GetStatusFromIndicator(YIndicator);

        return {
            IndexStatus: xStatus,
            Path1: path1,
            Path2: path2,
            WorkTreeStatus: yStatus,
        };
    }

    private static GetStatusFromIndicator(indicator: string): Status {
        switch (indicator) {
            case "A":
                return Status.Added;
            case "M":
                return Status.Modified;
            case "D":
                return Status.Deleted;
            case "R":
                return Status.Renamed;
            case "?":
                return Status.Untracked;
            case "!":
                return Status.Ignored;
            case "C":
                return Status.Copied;
            case "U":
                return Status.Updated;
            default:
                return Status.None;
        }
    }
}
