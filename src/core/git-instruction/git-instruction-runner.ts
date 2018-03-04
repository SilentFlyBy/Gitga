import * as ChildProcess from "child_process";
import {GitCommand, IGitInstruction} from "./";

export class GitInstructionRunner {
    private gitExecutableFilePath: string;

    constructor(gitExecutableFilePath: string) {
        this.gitExecutableFilePath = gitExecutableFilePath;
    }

    public async RunInstruction(instruction: IGitInstruction) {
        const array: string[] = [];
        array.push(instruction.Command.toString());
        
        
    }

    public async RunCommand(command: string[]): Promise<string> {
        const promise = new Promise<string>((resolve: any, reject: any) => {
            ChildProcess.execFile(this.gitExecutableFilePath, command, (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(data.toString());
            });
        });

        return promise;
    }
}
