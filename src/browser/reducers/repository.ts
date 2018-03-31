import { IRepositoryState } from "../store/git-store";
import { OpenRepository, OPEN_REPOSITORY_SUCCESS, OPEN_REPOSITORY_FAILURE } from "../actions/repository";

const initialRepositoryState: IRepositoryState = {
    Repository: undefined,
    Error: undefined,
};

export function OpenRepositoryResult(
    state: IRepositoryState = initialRepositoryState,
    action: OpenRepository,
): IRepositoryState {
    switch (action.type) {
        case OPEN_REPOSITORY_SUCCESS:
            return {...state, Repository: action.repository};
        case OPEN_REPOSITORY_FAILURE:
            return {...state, Error: action.error};
    }

    return state;
}
