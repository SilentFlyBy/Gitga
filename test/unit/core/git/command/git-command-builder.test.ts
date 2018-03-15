import { expect } from "chai";
import "mocha";
import { Git } from "../../../../../src/core/git";
import { GitCommandBuilder } from "../../../../../src/core/git/git-command-builder";
import { GitCommand, IGitCommand } from "../../../../../src/core/git/command/git-command";
import { IParameter } from "../../../../../src/core/git/parameter";

describe("Git command builder", () => {
    it("builds command string with multiple parameters correctly", () => {
        const parameter1String = "--file=test.ts";
        const parameter2String = "--test";
        const commandString = "testCommand";
        const expectedCommandString = `${commandString} ${parameter1String} ${parameter2String}`;

        const command = new GitCommand(commandString);
        const parameter1: IParameter<IGitCommand> = {
            Key: "",
            Type: {gitCommand: undefined},
            ToParameterString: () => parameter1String,
        };
        const parameter2: IParameter<IGitCommand> = {
            Key: "",
            Type: {gitCommand: undefined},
            ToParameterString: () => parameter2String,
        };

        command.Params([parameter1, parameter2]);

        const commandStringResult = GitCommandBuilder.BuildCommand(command);

        expect(commandStringResult).to.equal(expectedCommandString);
    });
});
