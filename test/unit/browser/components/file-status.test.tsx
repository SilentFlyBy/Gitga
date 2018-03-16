import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import { Status } from "../../../../src/core/git/file-status";
import FileStatus from "../../../../src/browser/components/app/file-status";
import FileStatusArea from "../../../../src/browser/components/app/file-status/file-status-area";

describe("<FileStatus />", () => {
    it("renders two file status areas", () => {
        const fileStatus = shallow(<FileStatus />);

        expect(fileStatus.find(FileStatusArea)).to.have.length(2);
    });
});
