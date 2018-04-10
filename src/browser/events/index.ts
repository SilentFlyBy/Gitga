import { Store } from "react-redux";
import { OpenRepository } from "../actions/repository";
import * as electron from "electron";

export default function configureEvents<S>(store: Store<S>) {
    if (process.versions.electron) {
        return configureElectronEvents(store);
    }
}

function configureElectronEvents<S>(store: Store<S>) {
    const el = require("electron");
    const listener = el.ipcRenderer;

    listener.on("openRepository", (event: any, message: string) => {
        store.dispatch(OpenRepository(message));
    });
}
