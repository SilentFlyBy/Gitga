import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import * as sinon from "sinon";

import {
    FileStatusArea,
    FileStatusAreaType,
    IAreaFileStatus,
} from "../../../../src/browser/components/app/file-status/file-status-area";
import { Status } from "../../../../src/core/git/file-status";

const fileStates: IAreaFileStatus[] = [{
    Path1: "test.js",
    Status: Status.Added,
}];

describe("<FileStatusArea />", () => {
    it("renders table", () => {
        const wrapper = shallow(<FileStatusArea fileStates={[]} type={FileStatusAreaType.Index} t={(key) => key}/>);

        expect(wrapper.find("table")).to.have.length(1);
    });

    it("shows file states correctly", () => {
        const wrapperIndex = shallow(<FileStatusArea fileStates={fileStates} type={FileStatusAreaType.Index} />);
        const wrapperWorkTree = shallow(<FileStatusArea fileStates={fileStates} type={FileStatusAreaType.WorkTree} />);

        expect(wrapperIndex.find("td.file-name").text()).to.equal("test.js");
        expect(wrapperIndex.find("td.file-status-icon").text()).to.equal("A");
        expect(wrapperIndex.find("td.action-buttons a").text()).to.equal("-");
        expect(wrapperWorkTree.find("td.action-buttons a").text()).to.equal("+");
    });

    it("calls button actions correctly", () => {
        const onClick = sinon.spy();
        const wrapper = shallow(<FileStatusArea fileStates={fileStates} onStage={onClick} />);
        wrapper.find("td.action-buttons a").simulate("click");
        wrapper.find("th.action-buttons a").simulate("click");

        expect(onClick.calledWith(fileStates)).to.be.true;
    });

    it("calls action handlers correctly", () => {
        const onSync = sinon.spy();
        const wrapper
            = shallow(<FileStatusArea fileStates={fileStates} onSync={onSync} />).instance() as FileStatusArea;

        wrapper.OnSync();

        expect(onSync.calledOnce).to.be.true;
    });
});
