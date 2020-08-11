import { fetchDatasetsPending, fetchDatasetsSuccess, fetchDatasetsError, newDataset, removeDataset, checkUp } from './../state/dataset/actionDataset';
import axios from 'axios';

export default function fetchDatasets() {
    return (dispatch) => {
        dispatch(fetchDatasetsPending());
        axios.get('http://localhost:3001/api/v1/datasets/findAll')
            .then(res => {
                dispatch(fetchDatasetsSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                dispatch(fetchDatasetsError(error));
            })
    }
}   

export const createDataset = object => dispatch => {
    axios.post('http://localhost:3001/api/v1/datasets', object)
        .then(res => {
            axios.get('http://localhost:3001/api/v1/datasets/findAll')
        .then(docs => {
                dispatch(newDataset(docs.data));
                return docs.data;
        })
        })
        .catch(error => {
                dispatch(fetchDatasetsError(error));
        })
}

export const deleteDataset = value => dispatch => {
    axios.delete('http://localhost:3001/api/v1/datasets/' + value)
    .then(res => {
        axios.get('http://localhost:3001/api/v1/datasets/findAll')
        .then(docs => {
            dispatch(removeDataset(docs.data));
        console.log('remove' , docs.data)
        return res.data;
        })       
    })
    .catch(err => {
        dispatch(fetchDatasetsError(err));
    })
}

export const checkItem = value => dispatch => {
    dispatch(checkUp(value));
}




