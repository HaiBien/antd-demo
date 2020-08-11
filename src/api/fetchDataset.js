import {
    fetchDatasetsPending,
    fetchDatasetsSuccess,
    fetchDatasetsError,
    newDataset,
    removeDataset,
    checkUp,
    checkAll,
    loadId,
    edit,
} from './../state/dataset/actionDataset';
import axios from 'axios';

export const fetchDatasets = () => dispatch => {
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
                    dispatch(checkUp(0, true, true, false))
                    console.log('remove', docs.data)
                    return res.data;
                })
        })
        .catch(err => {
            dispatch(fetchDatasetsError(err));
        })
}
export const LoadEditDataset = id => dispatch => {
    axios.get('http://localhost:3001/api/v1/datasets/' + id)
        .then(res => {
            dispatch(edit(res.data.data.name))
        })
        .catch(err => {
            dispatch(fetchDatasetsError(err));
        })
}

export const editDataset = (id, object) => dispatch => {
    axios.put('http://localhost:3001/api/v1/datasets/' + id, object)
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

export const LoadName = name => dispatch => {
    dispatch(edit(name))
}

export const checkItem = (count, edit, del, checkA) => dispatch => {
    dispatch(checkUp(count, edit, del, checkA));
}

export const checkAllItem = checkA => dispatch => {
    dispatch(checkAll(checkA));
}

export const loadEdit = id => dispatch => {
    dispatch(loadId(id));
}







