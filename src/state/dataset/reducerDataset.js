import { GET_DATASETS_PENDING, GET_DATASETS_SUCCESS, GET_DATASETS_ERROR, NEW_DATASETS, CHECK_UP, REMOVE_DATASET } from './actionDataset';

const initialState = {
    loading: true,
    datasets: [],
    error: null,
    count: 5,
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
                // count: this.count + 1
                count: action.payload,
            }
        case REMOVE_DATASET:
            return {
                ...state,
                datasets: action.payload,
            }
        default:
            return state;
    }
}
