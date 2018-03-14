import { expect } from "chai";
import "mocha";
import { Git } from "../../../src/core/git";

describe("Git module", () => {
    it("had correct commit command", () => {
        const command = Git.Commit();

        expect(command.Command).to.equal("commit");
    });

    it("had correct status command", () => {
        const command = Git.Status();

        expect(command.Command).to.equal("status");
    });

    it("had correct add command", () => {
        const command = Git.Add();

        expect(command.Command).to.equal("add");
    });

    it("had correct remove command", () => {
        const command = Git.Remove();

        expect(command.Command).to.equal("rm");
    });

    it("had correct reset command", () => {
        const command = Git.Reset();

        expect(command.Command).to.equal("reset");
    });
});
