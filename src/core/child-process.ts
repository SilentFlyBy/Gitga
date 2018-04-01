import * as CPS from "child_process";

const ExecProcess = (file: string, args: string[]): Promise<string> => {
    return new Promise((resolve, reject) => {
        CPS.execFile(file, args, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve(stdout);
            }
        });
    });
};

export default ExecProcess;
