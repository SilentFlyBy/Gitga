import * as React from "react";
import * as ReactDOM from "react-dom";

import Toolbar from "./toolbar/toolbar";

import {Git} from "../../core/git";

export default class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            output: "",
        };
    }

    public componentDidMount() {
        Git.Status().Params([
            Git.StatusParam.Short
        ])
        .Execute()
        .then(out => {
            const op = out.split(/\r?\n/)
            console.log(op);
            this.setState({
                output: op.map((o) => {
                    return (
                        <p>{o}</p>
                    );
                }),
            });
        })
        .catch(err => {
            console.error(err);
        });
    }

    public render() {
        return (
            <div>
                <Toolbar />
                <div>
                    {this.state.output}
                </div>
            </div>
        );
    }
}
