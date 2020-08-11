export const GET_DATASETS_PENDING = 'GET_DATASETS_PENDING';
export const GET_DATASETS_SUCCESS = 'GET_DATASETS_SUCCESS';
export const GET_DATASETS_ERROR = 'GET_DATASETS_ERROR';
export const NEW_DATASETS = 'NEW_DATASETS';
export const CHECK_UP = 'CHECK_UP';
export const REMOVE_DATASET = 'REMOVE_DATASET';
export const LOAD_ID = 'LOAD_ID';
export const CHECK_ALL = 'CHECK_ALL';
export const EDIT = 'EDIT';

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
export function checkUp(count, edit, del, checkA) {
    return {
        type: CHECK_UP,
        payload: {
            count,
            edit,
            del,
            checkA,
        }
    }
}
export function checkAll(checkA) {
    return {
        type: CHECK_ALL,
        payload: checkA,
    }
}

export function removeDataset(datasets) {
    return {
        type: REMOVE_DATASET,
        payload: datasets
    }
}
export function loadId(id) {
    return {
        type: LOAD_ID,
        payload: id,
    }
}

export function edit(name) {
    return {
        type: EDIT,
        payload: name,
    }
}