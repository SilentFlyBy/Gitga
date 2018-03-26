import { expect } from "chai";
import "mocha";
import { ResetArgument } from "../../../../../../src/core/git/command/reset/git-reset-command";

describe("Git reset argument", () => {
    it("builds string correctly", () => {
        const branch = "test1";
        const pathspec = "test2";

        const a: ResetArgument = new ResetArgument(branch, pathspec);
        const expectedString = `${branch} ${pathspec}`;
        const actualString = a.toString();

        expect(actualString).to.equal(expectedString);
    });
});
