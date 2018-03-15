import { IFileStatus, Status } from ".";

export class GitFileStatusParser  {
    public static ParseFileStatusLine(line: string): IFileStatus {
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

    public static ParseFileStatusLines(lines: string[]): IFileStatus[] {
        const returnArray: IFileStatus[] = [];

        for (const line of lines) {
            if (line.length === 0) { continue; }
            returnArray.push(this.ParseFileStatusLine(line));
        }

        return returnArray;
    }

    public static GetStatusFromIndicator(indicator: string): Status {
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
