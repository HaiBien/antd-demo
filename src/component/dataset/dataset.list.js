import React, { Component } from 'react';
import { Avatar } from 'antd'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import fetchDatasets from './../../api/fetchDataset';
import  checkItem  from './../../api/fetchDataset';


class App extends Component {

    componentDidMount() {
        const { fetchDatasets } = this.props;       
        fetchDatasets();
    }

    onCheckItem() {
        const value = document.getElementsByName('dataset');
        let dem = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i].checked === true) {
                dem++;
            }
        }
        const { onCheckItem } = this.props;        
        onCheckItem(dem);
    }


    render() {
        const { datasets } = this.props;
        const status = this.props.count;
        return (
            <div className="row"  >
                {status}
                {datasets.data && datasets.data.map((dataset) => (
                    <div className="data text-center" key={dataset._id} >
                        <div className='max-width-150'>
                            <div className="box">
                                <input type="checkbox" id={dataset._id} name='dataset' onChange={this.onCheckItem} />
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

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchDatasets: fetchDatasets,
            onCheckItem: checkItem
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(App);