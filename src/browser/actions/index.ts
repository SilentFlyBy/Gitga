import { ISyncFailure } from "./sync";
import { ICommitFailure } from "./commit";
import { IOpenRepositoryFailure } from "./repository";
import { Action } from "redux";

export type ErrorAction = ICommitFailure | ISyncFailure | IOpenRepositoryFailure;

export interface ISuccessAction extends Action {
    notificationMessage?: string;
}

export interface IErrorAction extends Action {
    error?: Error;
}
