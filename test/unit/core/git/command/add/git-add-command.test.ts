import { expect } from "chai";
import "mocha";
import { AddArgument } from "../../../../../../src/core/git/command/add/git-add-command";

describe("Git add argument", () => {
    it("builds string correctly", () => {
        const pathspec = "test";
        const a = new AddArgument(pathspec);

        const actualString = a.toString();

        expect(actualString).to.equal(pathspec);
    });
});
