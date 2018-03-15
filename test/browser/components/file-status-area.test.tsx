import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import FileStatusArea, { IAreaFileStatus, FileStatusAreaType } from "../../../src/browser/components/file-status-area";
import { Status } from "../../../src/core/git/file-status";
import * as sinon from "sinon";

const fileStates: IAreaFileStatus[] = [{
    Path1: "test.js",
    Status: Status.Added,
}];

describe("<FileStatusArea />", () => {
    it("renders table", () => {
        const wrapper = shallow(<FileStatusArea fileStates={[]} type={FileStatusAreaType.Index} />);

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
        const wrapper = shallow(<FileStatusArea fileStates={fileStates} onStageClick={onClick} />);
        wrapper.find("td.action-buttons a").simulate("click");
        wrapper.find("th.action-buttons a").simulate("click");

        expect(onClick.calledWith("test.js")).to.be.true;
        expect(onClick.calledWith(".")).to.be.true;
    });

    it("Stages file correctly", async () => {
        const onClick = sinon.spy();
        const indexWrapper = shallow(<FileStatusArea
            fileStates={fileStates}
            onSync={onClick}
            type={FileStatusAreaType.Index} />)
            .instance() as FileStatusArea;

        const workTreeWrapper = shallow(<FileStatusArea
            fileStates={fileStates}
            onSync={onClick}
            type={FileStatusAreaType.Index} />)
            .instance() as FileStatusArea;

        await Promise.all([
            indexWrapper.HandleStagingAction("test.js", undefined),
            workTreeWrapper.HandleStagingAction("test.js", undefined),
        ]);

        expect(onClick.calledTwice).to.be.true;
    });
});
