import { expect } from "chai";
import "mocha";

import {Git} from "../../src/core/git";
import {GitCommandBuilder} from "../../src/core/git/command/git-command-builder";

describe("Check if the command strings are correctly built from a git command object", () => {
    it("Should return 'status --short'", () => {
        const expectedCommandString = "status --short";

        const command = Git.Status().Params([
            Git.StatusParam.Short,
        ]);

        const commandString = GitCommandBuilder.BuildCommand(command);

        expect(commandString).to.equal(expectedCommandString);
    });

    it("should return 'commit --file=./test.js --no-verify", () => {
        const expectedCommandString = "commit --file=./test.js --no-verify";

        const command = Git.Commit().Params([
            Git.CommitParam.File("./test.js"),
            Git.CommitParam.NoVerify,
        ]);

        const commandString = GitCommandBuilder.BuildCommand(command);

        expect(commandString).to.equal(expectedCommandString);
    });
});
