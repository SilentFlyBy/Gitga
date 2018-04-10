import * as React from "react";
import * as ReactDOM from "react-dom";
import FileStatusArea, { FileStatusAreaType, IAreaFileStatus } from "./file-status-area";

export default class FileStatus extends React.Component<IFileStatusProps, any> {
    constructor(props: IFileStatusProps) {
        super(props);
    }

    public render() {
        return (
            <div className="file-status">
                <FileStatusArea
                    type={FileStatusAreaType.Index}
                    fileStates={this.props.stagedFileStates}
                    onStage={this.onUnStage}
                    onFileClick={this.onFileSelect}
                    onStageAll={this.onUnstageAll} />

                <FileStatusArea
                    type={FileStatusAreaType.WorkTree}
                    fileStates={this.props.unstagedFileStates}
                    onStage={this.onStage}
                    onFileClick={this.onFileSelect}
                    onStageAll={this.onStageAll} />
            </div>
        );
    }

    public onStage = (files: IAreaFileStatus[]) => {
        if (typeof this.props.onStage === "function") {
            this.props.onStage(files);
        }
    }

    public onStageAll = () => {
        if (typeof this.props.onStageAll === "function") {
            this.props.onStageAll();
        }
    }

    public onUnStage = (files: IAreaFileStatus[]) => {
        if (typeof this.props.onUnstage === "function") {
            this.props.onUnstage(files);
        }
    }

    public onUnstageAll = () => {
        if (typeof this.props.onUnstageAll === "function") {
            this.props.onUnstageAll();
        }
    }

    public onSync = () => {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
        }
    }

    public onFileSelect = (file: string) => {
        if (typeof this.props.onFileSelect === "function") {
            this.props.onFileSelect(file);
        }
    }
}

export interface IFileStatusProps {
    unstagedFileStates?: IAreaFileStatus[];
    stagedFileStates?: IAreaFileStatus[];
    onStage?: (files: IAreaFileStatus[]) => void;
    onStageAll?: () => void;
    onUnstage?: (file: IAreaFileStatus[]) => void;
    onUnstageAll?: () => void;
    onSync?: () => void;
    onFileSelect?: (file: string) => void;
}
