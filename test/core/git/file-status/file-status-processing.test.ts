import { expect } from "chai";
import "mocha";

import {FileStatusProcessor, IFileStatus, Status} from "../../../../src/core/git/file-status";

describe("Git file status processor", () => {
    it("fetches file states correctly", async () => {
        const result = await FileStatusProcessor.GetAllFileStates(".");

        const expectedStates: IFileStatus[] = [{
            IndexStatus: Status.Added,
            Path1: "test.js",
            Path2: undefined,
            WorkTreeStatus: Status.None,
        }];

        expect(result).to.deep.equal(expectedStates);
    });
});
