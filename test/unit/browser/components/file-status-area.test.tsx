import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import * as sinon from "sinon";

import FileStatusArea, {
    FileStatusAreaType,
    IAreaFileStatus,
} from "../../../../src/browser/components/app/file-status/file-status-area";
import { Status } from "../../../../src/core/git/file-status";
import { Paper, ListItem, List } from "material-ui";
import { MuiThemeProvider } from "material-ui/styles";

import { JSDOM } from "jsdom";

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: "node.js",
};

const fileStates: IAreaFileStatus[] = [{
    Path1: "test.js",
    Status: Status.Added,
}];

describe("<FileStatusArea />", () => {
    it("renders paper", () => {
        const wrapper = shallow(<FileStatusArea fileStates={[]} type={FileStatusAreaType.Index} />);

        expect(wrapper.find(Paper)).to.have.length(1);
    });

    it("shows file states correctly", () => {
        const wrapperIndex = mount(
            <MuiThemeProvider>
                <FileStatusArea fileStates={fileStates} type={FileStatusAreaType.Index} />
            </MuiThemeProvider>,
        );
        const wrapperWorkTree = mount(
            <MuiThemeProvider>
                <FileStatusArea fileStates={fileStates} type={FileStatusAreaType.WorkTree} />
            </MuiThemeProvider>,
        );

        expect(wrapperIndex.find("span").first().text()).to.equal("Index");
        expect(wrapperIndex.find("span").last().text()).to.equal("test.js");
        expect(wrapperWorkTree.find("span").first().text()).to.equal("Worktree");
        expect(wrapperWorkTree.find("span").last().text()).to.equal("test.js");
    });

    it("calls button actions correctly", () => {
        const onClick = sinon.spy();
        const wrapper = mount(
            <MuiThemeProvider>
                <FileStatusArea fileStates={fileStates} onStage={onClick} type={FileStatusAreaType.Index} />
            </MuiThemeProvider>,
        );
        wrapper.find("svg").last().simulate("click");
        wrapper.find("svg").first().simulate("click");

        expect(onClick.calledWith(fileStates)).to.be.true;
        expect(onClick.calledTwice).to.be.true;
    });

    it("calls action handlers correctly", () => {
        const onSync = sinon.spy();
        const wrapper
            = shallow(<FileStatusArea fileStates={fileStates} onSync={onSync} />).instance() as FileStatusArea;

        wrapper.OnSync();

        expect(onSync.calledOnce).to.be.true;
    });
});
