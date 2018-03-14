import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";
import * as sinon from "sinon";

import Toolbar from "../../../src/browser/components/toolbar";
import Octicon from "react-component-octicons";

describe("<Toolbar />", () => {
    it("renders buttons", () => {
        const toolbar = shallow(<Toolbar />);
        const result = toolbar.contains(<Octicon name="git-commit" />)
        && toolbar.contains(<Octicon name="repo-push" />)
        && toolbar.contains(<Octicon name="repo-pull" />)
        && toolbar.contains(<Octicon name="git-branch" />)
        && toolbar.contains(<Octicon name="git-merge" />);

        expect(result).to.be.true;
    });

    it("calls button click handlers", () => {
        const onSyncClick = sinon.spy();
        const onCommitClick = sinon.spy();
        const onBranchClick = sinon.spy();
        const onMergeClick = sinon.spy();
        const onPullClick = sinon.spy();
        const onPushClick = sinon.spy();

        const toolbar = shallow(<Toolbar
            onSyncClick={onSyncClick}
            onCommitClick={onCommitClick}
            onBranchClick={onBranchClick}
            onMergeClick={onMergeClick}
            onPushClick={onPushClick}
            onPullClick={onPullClick}/>);

        toolbar.find(".commit-button").simulate("click");
        toolbar.find(".branch-button").simulate("click");
        toolbar.find(".merge-button").simulate("click");
        toolbar.find(".push-button").simulate("click");
        toolbar.find(".pull-button").simulate("click");
        toolbar.find(".sync-button").simulate("click");

        expect(onSyncClick.calledOnce).to.be.true;
        expect(onCommitClick.calledOnce).to.be.true;
        expect(onBranchClick.calledOnce).to.be.true;
        expect(onMergeClick.calledOnce).to.be.true;
        expect(onPushClick.calledOnce).to.be.true;
        expect(onPullClick.calledOnce).to.be.true;
    });
});
