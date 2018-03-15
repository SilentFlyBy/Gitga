import { expect } from "chai";
import "mocha";

import {Git} from "../../../src/core/git";
import { GitCommandBuilder } from "../../../src/core/git/git-command-builder";

describe("Git command builder", () => {
    it("builds single command string correctly", () => {
        const expectedCommandString = "status --short";

        const command = Git.Status().Params([
            Git.StatusParam.Short,
        ]);

        const commandString = GitCommandBuilder.BuildCommand(command);

        expect(commandString).to.equal(expectedCommandString);
    });

    it("builds multiple command string with key-value parameter correctly", () => {
        const expectedCommandString = "commit --file=./test.js --no-verify";

        const command = Git.Commit().Params([
            Git.CommitParam.File("./test.js"),
            Git.CommitParam.NoVerify,
        ]);

        const commandString = GitCommandBuilder.BuildCommand(command);

        expect(commandString).to.equal(expectedCommandString);
    });
});
