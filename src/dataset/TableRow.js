import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class TableRow extends Component {

    constructor(props){
        super(props);
        this.deleteFunc = this.deleteFunc.bind(this);
    }
    deleteFunc(){
       
        axios.delete('http://localhost:3001/api/v1/datasets/'+this.props.dataset._id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
    }
    

    render(){
        return(
            
            <tr>
                <td className={this.props.dataset.dataset_completed ? 'completed' : ''}>{this.props.dataset._id}</td>
                <td className={this.props.dataset.dataset_completed ? 'completed' : ''}>{this.props.dataset.name}</td>
                <td className={this.props.dataset.dataset_completed ? 'completed' : ''}>{this.props.dataset.uri}</td>
                <td className="text-center">
                <Link to={"/edit/" + this.props.dataset._id}><button className={"btn btn-success"}>Sửa</button></Link>
                <button style={{marginLeft: 10}} className={"btn btn-danger"} onClick={this.deleteFunc}>Xoá</button>
                <p></p>
                </td>    
            </tr>
        
        );
        
    }

}
