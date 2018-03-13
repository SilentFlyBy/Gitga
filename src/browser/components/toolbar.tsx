import * as React from "react";
import * as ReactDOM from "react-dom";
import Octicon from 'react-component-octicons';

export default class Toolbar extends React.Component {
    constructor(props: any) {
        super(props);
    }

    private handleButtonClick(button: ToolbarButton) {
        console.log(button.toString());
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
}

enum ToolbarButton {
    Commit,
    Push,
    Pull,
    Branch,
    Merge
}
