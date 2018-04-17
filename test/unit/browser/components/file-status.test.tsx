import * as React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import "mocha";
import * as sinon from "sinon";
import { Status } from "../../../../src/core/git/file-status";
import FileStatus from "../../../../src/renderer/components/app/file-status";
import FileStatusArea, { IAreaFileStatus } from "../../../../src/renderer/components/app/file-status/file-status-area";

const file1: IAreaFileStatus[] = [{
    Path1: "test1.js",
    Status: Status.Added,
}];

const file2: IAreaFileStatus[] = [{
    Path1: "test2.js",
    Status: Status.Added,
}];

describe("<FileStatus />", () => {
    it("renders two file status areas", () => {
        const fileStatus = shallow(<FileStatus />);

        expect(fileStatus.find(FileStatusArea)).to.have.length(2);
    });

    it("calls action handlers correctly", () => {
        const onStage = sinon.spy();
        const onUnStage = sinon.spy();
        const onSync = sinon.spy();

        const wrapper = shallow(<FileStatus
            onStage={onStage}
            onUnstage={onUnStage}
            onSync={onSync}
        />).instance() as FileStatus;

        wrapper.onStage(file1);
        wrapper.onUnStage(file2);
        wrapper.onSync();

        expect(onStage.calledOnceWith(file1)).to.be.true;
        expect(onUnStage.calledOnceWith(file2)).to.be.true;
        expect(onSync.calledOnce).to.be.true;
    });
});
