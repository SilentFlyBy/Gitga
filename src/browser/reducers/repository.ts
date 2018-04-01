import { IRepositoryState } from "../store/git-store";
import { OpenRepository, OPEN_REPOSITORY_SUCCESS, OPEN_REPOSITORY_FAILURE } from "../actions/repository";

const initialRepositoryState: IRepositoryState = {
    Repository: undefined,
    RepositoryPath: undefined,
};

export function RepositoryReducer(
    state: IRepositoryState = initialRepositoryState,
    action: OpenRepository,
): IRepositoryState {
    switch (action.type) {
        case OPEN_REPOSITORY_SUCCESS:
            return {...state, Repository: action.repository, RepositoryPath: action.path};
    }

    return state;
}
