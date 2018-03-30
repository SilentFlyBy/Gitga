import * as React from "react";
import { expect } from "chai";
import { shallow, mount, configure } from "enzyme";
import * as ReactSixteenAdapter from "enzyme-adapter-react-16";
import "mocha";

import App from "../../../../src/browser/components/app";
import { AppBar } from "material-ui";

configure({ adapter: new ReactSixteenAdapter() });

describe ("<App />", () => {
    it ("renders AppBar", () => {
        const app = shallow(<App />);

        expect(app.find(AppBar)).to.have.length(1);
    });
});
