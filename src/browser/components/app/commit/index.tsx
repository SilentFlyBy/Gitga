import * as React from "react";
import * as ReactDOM from "react-dom";
import { Paper, TextField, RaisedButton } from "material-ui";
import Octicon from "react-component-octicons";

export class CommitComponent extends React.Component<ICommitComponentProps, any> {
    constructor(props: ICommitComponentProps) {
        super(props);
    }
    public render() {
        const style = {
            paper: {
                margin: "5px",
                display: "flex",
                flexFlow: "row nowrap",
                justifyContent: "space-between",
                alignItems: "center",
            } as React.CSSProperties,
            textField: {
                flexGrow: 1,
            } as React.CSSProperties,
        };

        return (
            <Paper style={style.paper}>
                <TextField
                    multiLine={true}
                    floatingLabelText="Commit message"
                    rows={2}
                    style={style.textField}
                    onChange={(event: any, text: string) => this.onTextEnter(text)}
                    value={this.props.commitMessage}
                />
                <RaisedButton
                    primary={true}
                    label="Commit"
                    icon={<Octicon name="git-commit" />}
                    onClick={() => this.onCommit()} />
            </Paper>
        );
    }

    private onCommit = () => {
        if (typeof this.props.onCommit === "function") {
            this.props.onCommit();
        }
    }

    private onTextEnter = (text: string) => {
        if (typeof this.props.onCommitMessageChange === "function") {
            this.props.onCommitMessageChange(text);
        }
    }
}

export interface ICommitComponentProps {
    onCommit?: () => void;
    onCommitMessageChange?: (message: string) => void;
    commitMessage?: string;
}
