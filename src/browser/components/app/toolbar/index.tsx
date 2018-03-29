import * as React from "react";
import * as ReactDOM from "react-dom";
import { Toolbar, ToolbarGroup, ToolbarTitle, FontIcon, SvgIcon } from "material-ui";
import { red500, greenA200 } from "material-ui/styles/colors";
import Octicon from "react-component-octicons";

export default class ToolbarComponent extends React.Component<IToolbarProps, any> {
    constructor(props: IToolbarProps) {
        super(props);
    }

    public render() {

        const iconStyles = {
            marginRight: 24,
        };

        return (
            <Toolbar>
                <ToolbarGroup>
                    <button onClick={() => this.OnCommitClick()}>
                        <Octicon name="git-commit" />
                    </button>
                    <button onClick={() => this.OnSyncClick()}>
                        <Octicon name="sync" />
                    </button>
                </ToolbarGroup>
            </Toolbar>
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
