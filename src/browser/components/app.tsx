import * as React from "react";
import * as Alert from "react-bootstrap/lib/Alert";
import * as Grid from "react-bootstrap/lib/Grid";
import * as Row from "react-bootstrap/lib/Row";
import * as ReactDOM from "react-dom";

import Toolbar from "./toolbar/toolbar";

import {Git} from "../../core/git";

export default class App extends React.Component<IAppProps, Partial<IAppState>> {
    constructor(props: IAppProps) {
        super(props);
        this.state = {
            output: "",
        };
    }

    public componentDidMount() {
        Git.Commit().Params([
            Git.CommitParam.Message(""),
        ]).Execute();

        Git.Status().Params([
            Git.StatusParam.Short,
        ]);
    }

    public render() {
        return (
            <Grid fluid={true} >
                <Row className="showGrid">
                    <Toolbar />
                    <Alert bsStyle="warning">
                        <strong>
                                {this.state.output}
                        </strong>
                    </Alert>
                </Row>
            </Grid>
        );
    }
}

interface IAppState {
    output?: string;
}

interface IAppProps {
    output?: string;
}
