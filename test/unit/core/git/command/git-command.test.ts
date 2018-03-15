import { expect } from "chai";
import "mocha";
import { Git } from "../../../../../src/core/git";

describe("Git module", () => {
    it("has correct commit command", () => {
        const command = Git.Commit();

        expect(command.Command).to.equal("commit");
    });

    it("has correct status command", () => {
        const command = Git.Status();

        expect(command.Command).to.equal("status");
    });

    it("has correct add command", () => {
        const command = Git.Add();

        expect(command.Command).to.equal("add");
    });

    it("has correct remove command", () => {
        const command = Git.Remove();

        expect(command.Command).to.equal("rm");
    });

    it("has correct reset command", () => {
        const command = Git.Reset();

        expect(command.Command).to.equal("reset");
    });

    it("has correct checkout command", () => {
        const command = Git.Checkout();

        expect(command.Command).to.equal("checkout");
    });
});
