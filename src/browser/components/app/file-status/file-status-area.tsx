import * as React from "react";

import { translate } from "react-i18next";

import { Status } from "../../../../core/git/file-status";

export class FileStatusArea extends React.Component<IFileStatusProps, any> {
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
                    <td className={iconClassName} onClick={() => this.OnFileFlick(s.Path1)}>{fileStatus}</td>
                    <td className="file-name" onClick={() => this.OnFileFlick(s.Path1)}>{s.Path1}</td>
                    <td className="action-buttons">
                        <a onClick={() => this.OnStage([s])}>{stagingActionIcon}</a>
                    </td>
                </tr>,
            );
        }

        const headline = `${FileStatusAreaType[this.props.type]}`;

        let stageAllButton;
        if (this.props.fileStates.length > 0) {
            stageAllButton =
                <a onClick={() => this.OnStageAll()}>
                    {this.GetStagingActionIcon(this.props.type)}
                </a>;
        }

        return (
            <div className={["paper", "file-status-area", this.className].join(" ")}>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={2}>{headline}</th>
                            <th className="action-buttons">
                                {stageAllButton}
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

    public OnSync() {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
        }
    }

    private OnStage = (files: IAreaFileStatus[]) => {
        if (typeof this.props.onStage === "function") {
            this.props.onStage(files);
        }
    }

    private OnStageAll = () => {
        if (typeof this.props.onStageAll === "function") {
            this.props.onStageAll();
        }
    }

    private OnFileFlick = (file: string) => {
        if (typeof this.props.onFileClick === "function") {
            this.props.onFileClick(file);
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
            case Status.Renamed:
                return "R";
            default:
                return undefined;
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
export default translate()(FileStatusArea);

export interface IAreaFileStatus {
    Path1: string;
    Path2?: string;
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
    onStage?: (files: IAreaFileStatus[]) => void;
    onStageAll?: () => void;
    onFileClick?: (file: string) => void;
    t?: any;
    tReady?: any;
}
