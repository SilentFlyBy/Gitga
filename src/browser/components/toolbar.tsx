import * as React from "react";
import Octicon from "react-component-octicons";
import * as ReactDOM from "react-dom";

export default class Toolbar extends React.Component {
    constructor(props: any) {
        super(props);
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
            </div>
        );
    }

    private handleButtonClick(button: ToolbarButton) {
        console.log(button.toString());
    }
}

enum ToolbarButton {
    Commit,
    Push,
    Pull,
    Branch,
    Merge,
}
