import React, { Component } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

export default class EditDataset extends Component {

    constructor(props) {
        super(props);
        this.onChangeDatasetName = this.onChangeDatasetName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: '',
            id: this.props.item,
        }
    }

    async componentDidMount() {
        console.log('item       ' + this.state.id)
        await this.setState({id: this.props.item})
        console.log("id    " + this.state.id)
        axios.get('http://localhost:3001/api/v1/datasets/' + this.state.id)
            .then(response => {
                this.setState({
                    name: response.data.data.name
                })
            })
            .catch(function (error) {
                console.log(error);
            })
            
    }

    onChangeDatasetName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            name: this.state.name
        };
        console.log(obj);
        axios.put('http://localhost:3001/api/v1/datasets/' + this.state.id, obj)
            .then(res => {
                toast.success('Thành công!', { autoClose: 2000, pauseOnHover: false});     
                console.log(res.data)
                this.props.history.go();
            })
            .catch(err =>{
                toast.error('Chỉnh sửa thất bại!', { autoClose: 2000, pauseOnHover: false });     

            })
            
    }

    render() {
        return (
            <div className="text-center" >
                <form onSubmit={this.onSubmit} id='myFormEdit'>
                    <div className="form-group">
                        <input placeholder='Dataset name' className='form-control' type="text"
                            value={this.state.name}
                            onChange={this.onChangeDatasetName}
                        />
                    </div>
                </form>
            </div>
        )
    }
}