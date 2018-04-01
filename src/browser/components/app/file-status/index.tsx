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
                    onStage = {this.onUnStage} />

                <FileStatusArea
                    type={FileStatusAreaType.WorkTree}
                    fileStates={this.props.unstagedFileStates}
                    onStage = {this.onStage} />
            </div>
        );
    }

    public onStage = (files: IAreaFileStatus[]) => {
        if (typeof this.props.onStage === "function") {
            this.props.onStage(files);
        }
    }

    public onUnStage = (files: IAreaFileStatus[]) => {
        if (typeof this.props.onUnstage === "function") {
            this.props.onUnstage(files);
        }
    }

    public onSync = () => {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
        }
    }
}

export interface IFileStatusProps {
    unstagedFileStates?: IAreaFileStatus[];
    stagedFileStates?: IAreaFileStatus[];
    onStage?: (files: IAreaFileStatus[]) => void;
    onUnstage?: (file: IAreaFileStatus[]) => void;
    onSync?: () => void;
}
