import { app } from "electron";
import * as path from "path";
import * as storage from "electron-json-storage";

export default class Settings {
    public static save = (setting: Setting): Promise<void> => {
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

    public static get = (key: SettingKey): Promise<any> => {
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
}

interface IKeyValue {
    value: any;
}

export type Setting = IRepositoryPathSetting;

export interface ISetting<T extends SettingKey, K> {
    type: T;
    value: K;
}

export interface IRepositoryPathSetting extends ISetting<REPOSITORY_PATH, string> { }

export type SettingKey = REPOSITORY_PATH;

export const REPOSITORY_PATH = "REPOSITORY_PATH";
export type REPOSITORY_PATH = typeof REPOSITORY_PATH;
