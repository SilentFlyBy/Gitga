import {expect} from "chai";
import {GitCommand, GitInstructionParser} from "../../../src/core/git-instruction";

describe("Git instruction parser", () => {
    it("Parser parses correctly", () => {
        const parser = new GitInstructionParser();
        const instructionString = "status --short";

        const instruction = parser.ParseInstructionString(instructionString);
        expect(instruction.Command).to.equal(GitCommand.Status);
    });
});
