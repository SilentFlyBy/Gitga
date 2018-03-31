import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import * as sinon from "sinon";

import { CommitComponent } from "../../../../src/browser/components/app/commit";
import { Paper, RaisedButton } from "material-ui";

import { JSDOM } from "jsdom";
import { MuiThemeProvider } from "material-ui/styles";
import { Button } from "react-bootstrap/lib/InputGroup";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: "node.js",
};

describe("<CommitComponent />", () => {
    it("renders <Paper />", () => {
        const wrapper = shallow(<CommitComponent />);

        expect(wrapper.find(Paper)).to.have.length(1);
    });

    it("calls action handlers correctly", () => {
        const onCommit = sinon.spy();
        const onCommitMessageChange = sinon.spy();

        const wrapper = mount(
            <MuiThemeProvider>
                <CommitComponent onCommit={onCommit} onCommitMessageChange={onCommitMessageChange}/>
            </MuiThemeProvider>,
        );

        wrapper.find("button").simulate("click");
        expect(onCommit.calledOnce).to.be.true;

        wrapper.find("textarea").last().simulate("change", {target: {value: "test"}});
        expect(onCommitMessageChange.calledWith("test")).to.be.true;
    });
});
