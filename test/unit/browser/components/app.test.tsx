import * as React from "react";
import { expect } from "chai";
import { shallow, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";

import App from "../../../../src/browser/components/app";
import Toolbar from "../../../../src/browser/containers/toolbar";

configure({ adapter: new ReactSixteenAdapter() });

describe ("<App />", () => {
    it ("renders Toolbar", () => {
        const app = shallow(<App />);

        expect(app.find(Toolbar)).to.have.length(1);
    });
});
