import * as React from "react";
import { expect } from "chai";
import { shallow } from "enzyme";
import "mocha";
import * as sinon from "sinon";

import { CommitComponent } from "../../../../src/renderer/components/app/commit";

describe("<CommitComponent />", () => {
    it("renders textarea and button", () => {
        const wrapper = shallow(<CommitComponent />);

        expect(wrapper.find("textarea")).to.have.length(1);
        expect(wrapper.find("button")).to.have.length(1);
    });

    it("calls action handlers correctly", () => {
        const onCommit = sinon.spy();
        const onCommitMessageChange = sinon.spy();

        const wrapper = shallow(<CommitComponent onCommit={onCommit} onCommitMessageChange={onCommitMessageChange}/>);

        wrapper.find("button").simulate("click");
        expect(onCommit.calledOnce).to.be.true;

        wrapper.find("textarea").simulate("change", {target: {value: "test"}});
        expect(onCommitMessageChange.calledWith("test")).to.be.true;
    });
});
