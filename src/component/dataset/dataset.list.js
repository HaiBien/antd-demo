import React, { Component } from 'react';
import { Avatar } from 'antd'
import { connect } from 'react-redux';
import { fetchDatasets, checkItem, loadEdit } from './../../api/fetchDataset';


class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchDatasets();
    }

    onCheckItem() {
        const value = document.getElementsByName('dataset');
        let dem = 0;
        let id;
        let max = this.props.datasets.data.length;
        for (let i = 0; i < value.length; i++) {
            if (value[i].checked === true) {
                dem++;             
                id = value[i].id
            }
        }
        if(dem === 0) {
            this.props.checkItem(dem, true, true, false);
        } else if (dem === 1) {
            this.props.checkItem(dem, false, false, false);
            this.props.loadEdit(id);
        } else if (dem === max) {
            this.props.checkItem(dem, true, false, true)
        } else if (dem > 0) {
            this.props.checkItem(dem, true, false, false)
        }      
    }


    render() {
        const { datasets } = this.props;
        return (
            <div className="row"  >
                {datasets.data && datasets.data.map((dataset) => (
                    <div className="data text-center" key={dataset._id} >
                        <div className='max-width-150'>
                            <div className="box">
                                <input type="checkbox" id={dataset._id} name='dataset' onClick={() => this.onCheckItem()} />
                            </div>
                            <div className="avt">
                                <Avatar
                                    shape="square"
                                    size={150}
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTgHcNk4oVFWw82Cxa8Q2NKc1_NfcQ8EqPRAA&usqp=CAU"
                                />
                            </div>
                        </div>
                        <p className="text-center size-1-5 padding-top-1">{dataset.name}</p>
                    </div>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return ({
        loading: state.datasetsReducer.loading,
        error: state.datasetsReducer.error,
        datasets: state.datasetsReducer.datasets,
        count: state.datasetsReducer.count,
    })

};

export default connect(mapStateToProps, { checkItem, fetchDatasets, loadEdit })(App);