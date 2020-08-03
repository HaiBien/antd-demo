import { FolderFilled } from '@ant-design/icons';
import { toast } from 'react-toastify';
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
    
    constructor(props) {
        super(props);

        this.onChangeDatasetName = this.onChangeDatasetName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);     
        this.state = {
            name: ''
        }
    }

    onChangeDatasetName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();        
        const newDataset = {
            name: this.state.name
        }
        axios.post('http://localhost:3001/api/v1/datasets', newDataset)
            .then(response => {
                if (response.data != null) {      
                    toast.success('Thành công!', { autoClose: 2000, pauseOnHover: false });             
                }
            })
            .catch(err => {
                toast.error('Tên dataset đã được sử dụng!', { autoClose: 2000, pauseOnHover: false });
            })
        this.setState({
            name: ''
        })
    }
    
    render() {
        return (
            <div className="text-center" >
                <form onSubmit={this.onSubmit} id='myForm'>
                    <div className="form-group">
                    <p > <span className="size-8"> <FolderFilled /></span> <br></br> </p>
                        <input className="input-border"  type="text"
                                value={this.state.name}
                                onChange={this.onChangeDatasetName}
                                />
                    </div>
                </form>
            </div>
        )
    }
}