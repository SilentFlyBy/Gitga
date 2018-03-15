import * as CP from "child_process";

export class ChildProcess {
    public static Execute(command: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            CP.exec(command, (err, stdout) => {
                if (err) {
                    reject(err);
                }

                resolve(stdout);
            });
        });
    }
}
