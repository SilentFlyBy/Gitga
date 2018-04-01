import * as Git from "nodegit";
import Settings from "../../settings";

export default class GitConfig {
    public static async GetAuthor(): Promise<IGitAuthor> {
        try {
            return await this.TryGetConfigFromGit();
        } catch {
            const author = await Settings.getRepositoryAuthor();
            return author;
        }
    }

    private static async TryGetConfigFromGit(): Promise<IGitAuthor> {
        const config = await Git.Config.openDefault();
        const name = await config.getStringBuf("user.name");
        const email = await config.getStringBuf("user.email");

        const author = {
            Name: name.toString(),
            Email: email.toString(),
        };

        Settings.setRepositoryAuthor(author);

        return author;
    }
}

export interface IGitAuthor {
    Name: string;
    Email: string;
}
