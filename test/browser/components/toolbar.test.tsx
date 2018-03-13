import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";

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
});
