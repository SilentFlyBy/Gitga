import { expect, assert } from "chai";
import "mocha";
import { ChildProcess } from "../../../src/core/child-process";

describe("ChildProcess", () => {
    it("executes child processes correctly", async () => {
        const value = await ChildProcess.Execute("echo test");

        expect(value.trim()).to.equal("test");
    });

    it("fails on error", async () => {
       ChildProcess.Execute("foobarbaztesttest")
       .then(() => {
           assert.fail();
       })
       .catch((err) => {
            assert.ok(true);
       });
    });
});
