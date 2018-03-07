import { expect } from "chai";
import "mocha";

import {Git} from "../../src/core/git";
import {GitCommandBuilder} from "../../src/core/git/command/git-command-builder";

describe("Check if the command strings are correctly built from a git command object", () => {
    it("Should return 'status --short'", () => {
        let expectedCommandString = "status --short";

        let command = Git.Status().Params([
            Git.StatusParam.Short
        ]);

        let commandString = GitCommandBuilder.BuildCommand(command);

        expect(commandString).to.equal(expectedCommandString);
    });

    it("should return 'commit --file=./test.js --no-verify", () => {
        let expectedCommandString = "commit --file=./test.js --no-verify";

        let command = Git.Commit().Params([
            Git.CommitParam.File("./test.js"),
            Git.CommitParam.NoVerify,
        ]);

        let commandString = GitCommandBuilder.BuildCommand(command);

        expect(commandString).to.equal(expectedCommandString);
    })
});