import { app } from "electron";
import * as storage from "electron-json-storage";
import {IGitAuthor} from "../git/config";

export default class Settings {
        public static async getRepositoryPath(): Promise<string> {
        const obj = await this.get(REPOSITORY_PATH);
        return obj as string;
    }

    public static async setRepositoryPath(path: string) {
        this.save({type: REPOSITORY_PATH, value: path});
    }

    public static async getRepositoryAuthor(): Promise<IGitAuthor> {
        const obj = await this.get(REPOSITORY_AUTHOR);
        return obj as IGitAuthor;
    }

    public static async setRepositoryAuthor(author: IGitAuthor) {
        this.save({type: REPOSITORY_AUTHOR, value: author});
    }

    private static get = (key: SettingKey): Promise<any> => {
        return new Promise((resolve, reject) => {
            storage.get(key, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    const payload = data as IKeyValue;
                    const setting = payload.value;
                    resolve(setting);
                }
            });
        });
    }

    private static save = (setting: Setting): Promise<void> => {
        return new Promise((resolve, reject) => {

            storage.set(setting.type, {value: setting.value}, (error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(error);
                }
            });
        });
    }
}

interface IKeyValue {
    value: any;
}

type Setting = IRepositoryPathSetting | IRepositoryAuthorSetting;

interface ISetting<T extends SettingKey, K> {
    type: T;
    value: K;
}

interface IRepositoryPathSetting extends ISetting<REPOSITORY_PATH, string> { }
interface IRepositoryAuthorSetting extends ISetting<REPOSITORY_AUTHOR, IGitAuthor> {}

type SettingKey = REPOSITORY_PATH | REPOSITORY_AUTHOR;

const REPOSITORY_PATH = "REPOSITORY_PATH";
type REPOSITORY_PATH = typeof REPOSITORY_PATH;

const REPOSITORY_AUTHOR = "REPOSITORY_AUTHOR";
type REPOSITORY_AUTHOR = typeof REPOSITORY_AUTHOR;
