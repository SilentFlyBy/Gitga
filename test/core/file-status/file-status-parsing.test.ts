import { expect } from "chai";
import "mocha";

import {FileStatusProcessor, IFileStatus, Status} from "../../../src/core/file-status";

describe("Git file status parser", () => {
    it("parses single added file correctly", () => {
        const testString = "A  testfile.txt";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus[] = [{
            FileName: "testfile.txt",
            NewFileName: undefined,
            Staged: true,
            Status: Status.Added,
        }];

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single moved file correctly", () => {
        const testString = "R  src/browser/components/toolbar/toolbar.tsx -> src/browser/components/toolbar.tsx";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus[] = [{
            FileName: "src/browser/components/toolbar/toolbar.tsx",
            NewFileName: "src/browser/components/toolbar.tsx",
            Staged: true,
            Status: Status.Renamed,
        }];

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses multiple lines correctly", () => {
        const testString =
`M  src/browser/components/app.tsx
R  src/browser/components/branch-tree/branch-tree.tsx -> src/browser/components/branch-tree.tsx
A  src/browser/components/file-status.tsx
 D src/browser/components/toolbar/toolbar.tsx
AM src/core/file-status/file-status-processor.ts`;

        const fileStatuses = FileStatusProcessor.ParseStatusLines(testString);

        const expectedFileStatuses: IFileStatus[] = [
            {
                FileName: "src/browser/components/app.tsx",
                NewFileName: undefined,
                Staged: true,
                Status: Status.Modified,
            },
            {
                FileName: "src/browser/components/branch-tree/branch-tree.tsx",
                NewFileName: "src/browser/components/branch-tree.tsx",
                Staged: true,
                Status: Status.Renamed,
            },
            {
                FileName: "src/browser/components/file-status.tsx",
                NewFileName: undefined,
                Staged: true,
                Status: Status.Added,
            },
            {
                FileName: "src/browser/components/toolbar/toolbar.tsx",
                NewFileName: undefined,
                Staged: false,
                Status: Status.Deleted,
            },
            {
                FileName: "src/core/file-status/file-status-processor.ts",
                NewFileName: undefined,
                Staged: true,
                Status: Status.Added,
            },
            {
                FileName: "src/core/file-status/file-status-processor.ts",
                NewFileName: undefined,
                Staged: false,
                Status: Status.Modified,
            },
        ];

        expect(fileStatuses).to.deep.equal(expectedFileStatuses);
    });
});
