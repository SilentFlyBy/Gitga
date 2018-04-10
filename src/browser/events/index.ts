import * as electron from "electron";
import { Store } from "react-redux";
import { OpenRepository } from "../actions/repository";

export default function configureEvents<S>(store: Store<S>) {
    const listener = electron.ipcRenderer;

    listener.on("openRepository", (event: any, message: string) => {
        store.dispatch(OpenRepository(message));
    });
}
