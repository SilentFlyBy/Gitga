import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import FileStatus from "../../../../src/browser/components/file-status";
import FileStatusArea, { IAreaFileStatus } from "../../../../src/browser/components/file-status-area";
import { Status } from "../../../../src/core/git/file-status";

describe("<FileStatus />", () => {
    it("renders two file status areas", () => {
        const fileStatus = shallow(<FileStatus />);

        expect(fileStatus.find(FileStatusArea)).to.have.length(2);
    });

    it("syncs file states correctly", async () => {
        const fileStatus = shallow(<FileStatus />);
        const instance = fileStatus.instance() as FileStatus;
        await instance.updateFileStatus();

        const expectedFileStatus: IAreaFileStatus[] = [{
            Status: Status.Added,
            Path1: "test.js",
            Path2: undefined,
        }];

        expect(instance.state.stagedFileStates).to.deep.equal(expectedFileStatus);
    });
});
