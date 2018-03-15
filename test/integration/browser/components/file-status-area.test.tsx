import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import * as sinon from "sinon";
import FileStatusArea, {
    FileStatusAreaType,
    IAreaFileStatus,
} from "../../../../src/browser/components/file-status-area";
import { Status } from "../../../../src/core/git/file-status";

const fileStates: IAreaFileStatus[] = [{
    Path1: "test.js",
    Status: Status.Added,
}];

describe("<FileStatusArea />", () => {
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
