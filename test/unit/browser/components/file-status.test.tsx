import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import * as sinon from "sinon";
import { Status } from "../../../../src/core/git/file-status";
import FileStatus from "../../../../src/browser/components/app/file-status";
import FileStatusArea from "../../../../src/browser/components/app/file-status/file-status-area";

describe("<FileStatus />", () => {
    it("renders two file status areas", () => {
        const fileStatus = shallow(<FileStatus />);

        expect(fileStatus.find(FileStatusArea)).to.have.length(2);
    });

    it("calls action handlers correctly", () => {
        const onStage = sinon.spy();
        const onUnStage = sinon.spy();
        const onSync = sinon.spy();

        const wrapper
        = shallow(<FileStatus onStage={onStage} onUnstage={onUnStage} onSync={onSync} />).instance() as FileStatus;
        expect(onSync.calledOnce).to.be.true;

        wrapper.onStage(["test1"]);
        wrapper.onUnStage(["test2"]);
        wrapper.onSync();

        expect(onStage.calledOnceWith("test1")).to.be.true;
        expect(onUnStage.calledOnceWith("test2")).to.be.true;
        expect(onSync.calledTwice).to.be.true;
    });
});
