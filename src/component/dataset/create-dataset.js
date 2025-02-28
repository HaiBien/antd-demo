import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createDataset } from '../../api/fetchDataset';

class DatasetForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
            console.log('a');
            console.log('2');
            console.log('3');
            console.log('4');
            console.log('45');
        this.setState({
            name: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const object = {
            name: this.state.name
        };
        this.props.createDataset(object)
        this.setState({ name: '' });

    }

    render() {
        return (
            <div className="text-center" >
                <form onSubmit={this.onSubmit} id='myForm'>
                    <div className="form-group">
                        <input placeholder='Dataset name' className="form-control" type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return ({
        error: state.datasetsReducer.error,
    })
}

export default connect(mapStateToProps,  { createDataset } )(DatasetForm);
