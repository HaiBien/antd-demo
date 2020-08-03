import React, { Component } from 'react';
import Datasets from './data';
import axios from 'axios';

class App extends Component {

    render() {
        return (
            <Datasets datasets={this.state.datasets} />
        )
    }

    state = {
        datasets: []
    }

    componentDidMount() {
        axios.get('http://localhost:3001/api/v1/datasets/findAll')
            .then(res => {
                return res.data.data
            })
            .then((data) => {
              //  console.log(data)
                this.setState({ datasets: data })
            })
            .catch(console.log)
    }
    
    // componentDidUpdate() {
    //     axios.get('http://localhost:3001/api/v1/datasets/findAll')
    //         .then(res => {
    //             return res.data.data
    //         })
    //         .then((data) => {
    //            // console.log(data)
    //             this.setState({ datasets: data })
    //         })
    //         .catch(console.log)
    // }

    
}
export default App
