export const GET_DATASETS_PENDING = 'GET_DATASETS_PENDING';
export const GET_DATASETS_SUCCESS = 'GET_DATASETS_SUCCESS';
export const GET_DATASETS_ERROR = 'GET_DATASETS_ERROR';
export const NEW_DATASETS = 'NEW_DATASETS';
export const CHECK_UP = 'CHECK_UP';
export const REMOVE_DATASET = 'REMOVE_DATASET';

export function fetchDatasetsPending() {
    return {
        type: GET_DATASETS_PENDING
    }
}

export function fetchDatasetsSuccess(datasets) {
    return {
        type: GET_DATASETS_SUCCESS,
        payload: datasets
    }
}

export function fetchDatasetsError(error) {
    return {
        type: GET_DATASETS_ERROR,
        payload: error
    }
}
export function newDataset(datasets) {
    return {
        type: NEW_DATASETS,
        payload: datasets
    }
}
export function checkUp(count) {
    return {
        type: CHECK_UP,
        payload: count
    }
}

export function removeDataset(datasets) {
    return {
        type: REMOVE_DATASET,
        payload: datasets
    }
}