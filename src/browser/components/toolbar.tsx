import * as React from "react";
import * as ReactDOM from "react-dom";
import Octicon from "react-component-octicons";

export default class Toolbar extends React.Component<IToolbarProps, any> {
    constructor(props: IToolbarProps) {
        super(props);

        this.onSync = this.onSync.bind(this);
    }

    public render() {
        return (
            <div className="gitga-toolbar">
                <button onClick={() => this.handleButtonClick(ToolbarButton.Commit)}>
                    <Octicon name="git-commit" />
                </button>
                <button onClick={() => this.handleButtonClick(ToolbarButton.Push)}>
                    <Octicon name="repo-push" />
                </button>
                <button onClick={() => this.handleButtonClick(ToolbarButton.Pull)}>
                    <Octicon name="repo-pull" />
                </button>
                <button onClick={() => this.handleButtonClick(ToolbarButton.Branch)}>
                    <Octicon name="git-branch" />
                </button>
                <button onClick={() => this.handleButtonClick(ToolbarButton.Merge)}>
                    <Octicon name="git-merge" />
                </button>
                <button className="syncButton" onClick={this.onSync}>
                    <Octicon name="sync" />
                </button>
            </div>
        );
    }

    private handleButtonClick(button: ToolbarButton) {
        alert(button);
    }

    private onSync() {
        if (typeof this.props.onSync === "function") {
            this.props.onSync();
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
    onSync?: () => void;
}
