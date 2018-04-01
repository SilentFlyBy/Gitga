import { ISyncFailure } from "./sync";
import { ICommitFailure } from "./commit";
import { IOpenRepositoryFailure } from "./repository";

export type ErrorAction = ICommitFailure | ISyncFailure | IOpenRepositoryFailure;
