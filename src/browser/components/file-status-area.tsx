import * as React from "react";
import * as ReactDOM from "react-dom";
import { IFileStatus, Status } from "../../core/file-status";
import { Git } from "../../core/git";

export default class FileStatusArea extends React.Component<IFileStatusProps, any> {
    private className: string;

    constructor(props: IFileStatusProps) {
        super(props);

        if (props.type === FileStatusAreaType.Index) {
            this.className = "stagingArea";
        } else if (props.type === FileStatusAreaType.WorkTree) {
            this.className = "workspaceArea";
        }
    }

    public render() {
        const fileStateElements = [];

        for (const s of this.props.fileStates) {
            const fileStatus = this.GetFileStatusIndicator(s.Status);
            const iconClassName = `file-status-icon ${fileStatus}`;
            const stagingActionIcon = this.GetStagingActionIcon(this.props.type);

            fileStateElements.push(
            <tr key={s.Path1 + s.Status.toString()}>
                <td className={iconClassName}>{fileStatus}</td>
                <td className="file-name">{s.Path1}</td>
                <td className="action-buttons">
                    <a onClick={() => this.handleStagingAction(s)}>{stagingActionIcon}</a>
                </td>
            </tr>,
            );
        }

        return(
            <div className={["file-status-area", this.className].join(" ")}>
                <table>
                    <thead>
                        <tr>
                        <th>Status</th>
                        <th>Filename</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileStateElements}
                    </tbody>
                </table>
            </div>
        );
    }

    private onSync() {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
        }
    }

    private async handleStagingAction(s: IAreaFileStatus) {
        if (this.props.type === FileStatusAreaType.WorkTree) {
            await Git.Add().Args(s.Path1).Execute();
            this.onSync();
        } else if (this.props.type === FileStatusAreaType.Index) {
            await Git.Reset().Args(s.Path1).Execute();
            this.onSync();
        }
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

    private GetStagingActionIcon(type: FileStatusAreaType): string {
        switch (type) {
            case FileStatusAreaType.Index:
                return "-";
            case FileStatusAreaType.WorkTree:
                return "+";
        }
    }
}

export interface IAreaFileStatus {
    Path1: string;
    Status: Status;
}

export enum FileStatusAreaType {
    Index,
    WorkTree,
}

interface IFileStatusProps {
    fileStates: IAreaFileStatus[];
    type?: FileStatusAreaType;
    onSync?: () => void;
}
