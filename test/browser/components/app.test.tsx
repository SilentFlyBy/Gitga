import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";

import App from "../../../src/browser/components/app";
import Toolbar from "../../../src/browser/components/toolbar";

configure({ adapter: new ReactSixteenAdapter() });

describe ("<App />", () => {
    it ("renders Toolbar", () => {
        const result = shallow(<App />).contains(<Toolbar />);
        expect(result).to.be.true;
    });
});
