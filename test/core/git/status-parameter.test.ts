import { expect } from "chai";
import "mocha";
import { StatusParam } from "../../../src/core/git/parameter";

const statusParam: StatusParam = new StatusParam();
const testString = "test";

describe("StatusParam", () => {
    it("has correct untracked-files param", () => {
        const param = statusParam.UntrackedFiles(testString);

        expect(param.ToParameterString()).to.equal("--untracked-files=test");
    });
});
