import React, { Component } from 'react';
import { checkItem, LoadName, editDataset } from '../../api/fetchDataset';
import { connect } from 'react-redux';

class EditDataset extends Component {

    constructor(props) {
        super(props);
        this.onChangeDatasetName = this.onChangeDatasetName.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            name: this.props.name,
        }
    }

    onChangeDatasetName (e) {
        this.props.LoadName(e.target.value)
    }

    onSubmit(e) {
        e.preventDefault();
        const object = {
            name: this.props.name
        };
        this.props.editDataset(this.props.id, object)
    }

    render() {
        return (
            <div className="text-center" >
                <form onSubmit={this.onSubmit} id='myFormEdit'>
                    <div className="form-group">
                        <input placeholder='Dataset name' className='form-control' type="text"
                            value={this.props.name}
                            onChange={this.onChangeDatasetName}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({ 
        id: state.datasetsReducer.id,
        name: state.datasetsReducer.name,
    })
  };
  
  export default connect(mapStateToProps,  { checkItem, LoadName, editDataset } )(EditDataset);
  