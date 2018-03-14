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
        if (typeof props.onStageClick === "function") {
            this.OnStageClick = this.props.onStageClick;
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
                        <a onClick={() => this.OnStageClick(s.Path1)}>{stagingActionIcon}</a>
                    </td>
                </tr>,
            );
        }

        const headline = `${FileStatusAreaType[this.props.type]} Area`;

        return (
            <div className={["file-status-area", this.className].join(" ")}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>{headline}</th>
                        </tr>
                        <tr>
                            <th className="file-status-icon">Status</th>
                            <th className="file-name">Filename</th>
                            <th className="action-buttons">
                                <a onClick={() => this.OnStageClick(".")}>
                                    {this.GetStagingActionIcon(this.props.type)}
                                </a>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fileStateElements}
                    </tbody>
                </table>
            </div>
        );
    }

    public async HandleStagingAction(fileName: string) {
        if (this.props.type === FileStatusAreaType.WorkTree) {
            await Git.Add().Args(fileName).Execute();
            this.Sync();
        } else if (this.props.type === FileStatusAreaType.Index) {
            await Git.Reset().Args(fileName).Execute();
            this.Sync();
        }
    }

    private OnStageClick = (fileName: string) => {
        this.HandleStagingAction(fileName);
    }

    private Sync() {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
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
    onStageClick?: () => void;
}
