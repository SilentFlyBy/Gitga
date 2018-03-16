import * as React from "react";
import * as ReactDOM from "react-dom";
import Octicon from "react-component-octicons";

export default class ToolbarComponent extends React.Component<IToolbarProps, any> {
    constructor(props: IToolbarProps) {
        super(props);
    }

    public render() {
        return (
            <div className="gitga-toolbar">
                <button onClick={() => this.OnCommitClick()} className="commit-button">
                    <Octicon name="git-commit" />
                </button>
                <button onClick={() => this.OnPushClick()} className="push-button">
                    <Octicon name="repo-push" />
                </button>
                <button onClick={() => this.OnPullClick()} className="pull-button">
                    <Octicon name="repo-pull" />
                </button>
                <button onClick={() => this.OnBranchClick()} className="branch-button">
                    <Octicon name="git-branch" />
                </button>
                <button onClick={() => this.OnMergeClick()} className="merge-button">
                    <Octicon name="git-merge" />
                </button>
                <button onClick={() => this.OnSyncClick()} className="sync-button">
                    <Octicon name="sync" />
                </button>
            </div>
        );
    }

    private OnSyncClick() {
        if (typeof this.props.onSyncClick === "function") {
            this.props.onSyncClick();
        }
    }

    private OnCommitClick() {
        if (typeof this.props.onCommitClick === "function") {
            this.props.onCommitClick();
        }
    }

    private OnPushClick() {
        if (typeof this.props.onPushClick === "function") {
            this.props.onPushClick();
        }
    }

    private OnPullClick() {
        if (typeof this.props.onPullClick === "function") {
            this.props.onPullClick();
        }
    }

    private OnMergeClick() {
        if (typeof this.props.onMergeClick === "function") {
            this.props.onMergeClick();
        }
    }

    private OnBranchClick() {
        if (typeof this.props.onBranchClick === "function") {
            this.props.onBranchClick();
        }
    }
}

enum ToolbarButton {
    Commit,
    Push,
    Pull,
    Branch,
    Merge,
}

export interface IToolbarProps {
    onSyncClick?: () => void;
    onCommitClick?: () => void;
    onPushClick?: () => void;
    onPullClick?: () => void;
    onBranchClick?: () => void;
    onMergeClick?: () => void;
}
