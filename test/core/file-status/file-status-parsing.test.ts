import { expect } from "chai";
import "mocha";

import {FileStatusProcessor, IFileStatus, Status} from "../../../src/core/file-status";

describe("Git file status parser", () => {
    it("parses single added file correctly", () => {
        const testString = "A  testfile.txt";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "testfile.txt",
            Path2: undefined,
            IndexStatus: Status.Added,
            WorkTreeStatus: Status.None,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single moved file correctly", () => {
        const testString = "R  src/browser/components/toolbar/toolbar.tsx -> src/browser/components/toolbar.tsx";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "src/browser/components/toolbar/toolbar.tsx",
            Path2: "src/browser/components/toolbar.tsx",
            IndexStatus: Status.Renamed,
            WorkTreeStatus: Status.None,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single deleted file correctly", () => {
        const testString = "D  test.ts";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "test.ts",
            Path2: undefined,
            IndexStatus: Status.Deleted,
            WorkTreeStatus: Status.None,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single renamed file correctly", () => {
        const testString = "R  test.ts";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "test.ts",
            Path2: undefined,
            IndexStatus: Status.Renamed,
            WorkTreeStatus: Status.None,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single unknown file correctly", () => {
        const testString = "?? test.ts";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "test.ts",
            Path2: undefined,
            IndexStatus: Status.Unknown,
            WorkTreeStatus: Status.Unknown,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single copied file correctly", () => {
        const testString = " C test.ts";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "test.ts",
            Path2: undefined,
            IndexStatus: Status.None,
            WorkTreeStatus: Status.Copied,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses single updated file correctly", () => {
        const testString = " U test.ts";

        const fileStatus = FileStatusProcessor.ParseStatusLine(testString);
        const expectedFileStatus: IFileStatus = {
            Path1: "test.ts",
            Path2: undefined,
            IndexStatus: Status.None,
            WorkTreeStatus: Status.Updated,
        };

        expect(fileStatus).to.deep.equal(expectedFileStatus);
    });

    it("parses multiple lines correctly", () => {
        const testString =
`M  src/browser/components/app.tsx
R  src/browser/components/branch-tree/branch-tree.tsx -> src/browser/components/branch-tree.tsx
A  src/browser/components/file-status.tsx
 D src/browser/components/toolbar/toolbar.tsx
AM src/core/file-status/file-status-processor.ts
?? src/core/file-status/test.ts`;

        const fileStatuses = FileStatusProcessor.ParseStatusLines(testString);

        const expectedFileStatuses: IFileStatus[] = [
            {
                Path1: "src/browser/components/app.tsx",
                Path2: undefined,
                IndexStatus: Status.Modified,
                WorkTreeStatus: Status.None,
            },
            {
                Path1: "src/browser/components/branch-tree/branch-tree.tsx",
                Path2: "src/browser/components/branch-tree.tsx",
                IndexStatus: Status.Renamed,
                WorkTreeStatus: Status.None,
            },
            {
                Path1: "src/browser/components/file-status.tsx",
                Path2: undefined,
                IndexStatus: Status.Added,
                WorkTreeStatus: Status.None,
            },
            {
                Path1: "src/browser/components/toolbar/toolbar.tsx",
                Path2: undefined,
                IndexStatus: Status.None,
                WorkTreeStatus: Status.Deleted,
            },
            {
                Path1: "src/core/file-status/file-status-processor.ts",
                Path2: undefined,
                IndexStatus: Status.Added,
                WorkTreeStatus: Status.Modified,
            },
            {
                Path1: "src/core/file-status/test.ts",
                Path2: undefined,
                IndexStatus: Status.Unknown,
                WorkTreeStatus: Status.Unknown,
            },
        ];

        expect(fileStatuses).to.deep.equal(expectedFileStatuses);
    });
});
