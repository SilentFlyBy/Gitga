import {Git} from "../git";
import {IFileStatus, Status} from "./file-status";

export class FileStatusProcessor {
    public static async GetAllFileStates(): Promise<IFileStatus[]> {

        return new Promise<IFileStatus[]>((resolve, reject) => {
            return Git.Status().Params([Git.StatusParam.Porcelain]).Execute()
            .then((output) => {
                const fileStatusList: IFileStatus[] = this.ParseStatusLines(output);

                resolve(fileStatusList);
            });
        });
    }

    public static ParseStatusLines(lines: string): IFileStatus[] {
        const fileStatusList: IFileStatus[] = [];
        lines.split(/\r?\n/).forEach((line) => {
            const parsedLine = this.ParseStatusLine(line);
            fileStatusList.push.apply(fileStatusList, parsedLine);
        });

        return fileStatusList;
    }

    public static ParseStatusLine(line: string): IFileStatus[] {
        const stagedStatusIndicator = line.charAt(0);
        const unstagedStatusIndicator = line.charAt(1);
        const fileString = line.substring(3);

        let newFileName;
        const splitByArrow = fileString.split(/\s\-\>\s/);
        const fileName = splitByArrow[0];
        if (splitByArrow.length > 1) {
            newFileName = splitByArrow[1];
        }

        const fileStatusArray: IFileStatus[] = [];

        if (stagedStatusIndicator !== " ") {
            const status = this.GetStatusFromIndicator(stagedStatusIndicator);

            fileStatusArray.push({
                FileName: fileName,
                NewFileName: newFileName,
                Staged: true,
                Status: status,
            });
        }
        if (unstagedStatusIndicator !== " ") {
            const status = this.GetStatusFromIndicator(unstagedStatusIndicator);

            fileStatusArray.push({
                FileName: fileName,
                NewFileName: newFileName,
                Staged: false,
                Status: status,
            });
        }

        return fileStatusArray;
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
            case "??":
                return Status.Unknown;
        }
    }
}
