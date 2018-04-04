import * as React from "react";
import * as ReactDOM from "react-dom";
import Octicon from "react-component-octicons";
import i18n from "../../../i18n";

export class CommitComponent extends React.Component<ICommitComponentProps, any> {
    constructor(props: ICommitComponentProps) {
        super(props);
    }
    public render() {
        return (
            <div className={["paper", "commit-area"].join(" ")}>
                <textarea
                    rows={2}
                    placeholder={i18n.t("commit.message")}
                    onChange={(event) => this.onTextEnter(event.target.value)}
                    value={this.props.commitMessage} />
                <button onClick={() => this.onCommit()}>Commit</button>
            </div>
        );
    }

    private onTextEnter = (text: string) => {
        if (typeof this.props.onCommitMessageChange === "function") {
            this.props.onCommitMessageChange(text);
        }
    }

    private onCommit = () => {
        if (typeof this.props.onCommit === "function") {
            this.props.onCommit();
        }
    }
}

export interface ICommitComponentProps {
    onCommit?: () => void;
    onCommitMessageChange?: (message: string) => void;
    commitMessage?: string;
}
