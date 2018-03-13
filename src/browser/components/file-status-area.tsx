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
            <li key={s.Path1 + s.Status.toString()}>
                <span className="fileStatusIcon">{this.GetFileStatusIndicator(s.Status)}</span>
                <span className="fileName">{s.Path1}</span>
            </li>,
            );
        }

        return(
            <div className={this.props.className}>
                <ul>
                    {fileStateElements}
                </ul>
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
