import { expect } from "chai";
import "mocha";
import { CommitParam } from "../../../../../../src/core/git/command/commit/git-commit-parameter";

const commitParam: CommitParam = new CommitParam();
const testString = "test";

describe("CommitParam", () => {
    it("Has correct reuse-message param", () => {
        const param = commitParam.ReuseMessage(testString);

        expect(param.ToParameterString()).to.equal("--reuse-message=test");
    });

    it("Has correct reedit-message param", () => {
        const param = commitParam.ReeditMessage(testString);

        expect(param.ToParameterString()).to.equal("--reedit-message=test");
    });

    it("Has correct fixup param", () => {
        const param = commitParam.Fixup(testString);

        expect(param.ToParameterString()).to.equal("--fixup=test");
    });

    it("Has correct squash param", () => {
        const param = commitParam.Squash(testString);

        expect(param.ToParameterString()).to.equal("--squash=test");
    });

    it("Has correct reset-author param", () => {
        const param = commitParam.ResetAuthor(testString);

        expect(param.ToParameterString()).to.equal("--reset-author=test");
    });

    it("Has correct file param", () => {
        const param = commitParam.File(testString);

        expect(param.ToParameterString()).to.equal("--file=test");
    });

    it("Has correct author param", () => {
        const param = commitParam.Author(testString);

        expect(param.ToParameterString()).to.equal("--author=test");
    });

    it("Has correct date param", () => {
        const param = commitParam.Date(new Date("01.01.2012"));

        expect(param.ToParameterString()).to.equal("--date=Sun Jan 01 2012");
    });

    it("Has correct message param", () => {
        const param = commitParam.Message(testString);

        expect(param.ToParameterString()).to.equal("--message=test");
    });

    it("Has correct template param", () => {
        const param = commitParam.Template(testString);

        expect(param.ToParameterString()).to.equal("--template=test");
    });
});
