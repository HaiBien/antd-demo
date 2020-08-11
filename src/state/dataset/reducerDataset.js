import {
    GET_DATASETS_PENDING,
    GET_DATASETS_SUCCESS,
    GET_DATASETS_ERROR,
    NEW_DATASETS,
    CHECK_UP,
    REMOVE_DATASET,
    CHECK_ALL,
    LOAD_ID,
    EDIT
} from './actionDataset';

const initialState = {
    loading: true,
    datasets: [],
    error: null,
    count: 0,
    edit: true,
    del: true,
    checkA: false,
    id: '',
    name: '',
};

export default function datasetsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_DATASETS_PENDING:
            return {
                ...state,
                loading: true,
            };
        case GET_DATASETS_SUCCESS:
            return {
                ...state,
                loading: false,
                datasets: action.payload,
            };
        case GET_DATASETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case NEW_DATASETS:
            return {
                ...state,
                loading: false,
                datasets: action.payload,
            };
        case CHECK_UP:
            return {
                ...state,
                count: action.payload.count,
                edit: action.payload.edit,
                del: action.payload.del,
                checkA: action.payload.checkA,
            }
        case REMOVE_DATASET:
            return {
                ...state,
                datasets: action.payload,
            }
        case CHECK_ALL:
            return {
                ...state,
                checkA: action.payload,
            }
        case LOAD_ID:
            return {
                ...state,
                id: action.payload,
            }
        case EDIT:
            return {
                ...state,
                name: action.payload,
            }
        default:
            return state;
    }
}
