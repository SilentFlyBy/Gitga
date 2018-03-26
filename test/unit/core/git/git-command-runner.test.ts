import { expect, assert } from "chai";
import "mocha";
import { GitCommandRunner } from "../../../../src/core/git/git-command-runner";
import { GitCommand, IGitArgument } from "../../../../src/core/git/command/git-command";
import { CommitCommand } from "../../../../src/core/git/command/commit/git-commit-command";
import { Git } from "../../../../src/core/git/git";

describe("Git command runner", () => {
    it("gets test executable correctly", async () => {
        const testExe = await GitCommandRunner.TryGetGitExecutable();

        expect(testExe).to.equal("util/git-mock/git-mock");
    });

    it("runs commands correctly", async () => {
        const arg: IGitArgument<CommitCommand> = {
            type: CommitCommand,
            toString: () => "test",
        };

        const command = new GitCommand("test", arg);
        command.Params([Git.CommitParam.Long]);

        const actualString = await GitCommandRunner.RunCommand(command);
        const expectedString = "test --long test";

        expect(actualString.trim()).to.equal(expectedString);
    });
});
