import * as React from "react";
import * as ReactDOM from "react-dom";
import { IFileStatus, Status } from "../../core/file-status";

export default class FileStatusArea extends React.Component<IFileStatusProps, any> {
    constructor(props: IFileStatusProps) {
        super(props);
    }

    public render() {
        const fileStateElements = [];

        for (const s of this.props.fileStates) {
            fileStateElements.push(
            <tr key={s.Path1 + s.Status.toString()}>
                <td className="file-status-icon">{this.GetFileStatusIndicator(s.Status)}</td>
                <td className="file-name">{s.Path1}</td>
            </tr>,
            );
        }

        return(
            <div className={["file-status-area", this.props.className].join(" ")}>
                <table>
                    {fileStateElements}
                </table>
            </div>
        );
    }

    private GetFileStatusIndicator(status: Status): string {
        switch (status) {
            case Status.Added:
                return "A";
            case Status.Copied:
                return "C";
            case Status.Deleted:
                return "D";
            case Status.Untracked:
                return "?";
            case Status.Modified:
                return "M";
        }
    }
}

export interface IAreaFileStatus {
    Path1: string;
    Status: Status;
}

interface IFileStatusProps {
    fileStates?: IAreaFileStatus[];
    className?: string;
}
