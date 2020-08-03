import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Table } from 'antd';

const columns = [
    {
        title: 'STT',
        dataIndex: 'stt',

    },
    {
        title: '_id',
        dataIndex: 'name',
    },
    {
        title: 'name',
        dataIndex: 'age',
    },
    {
        title: 'Uri',
        dataIndex: 'address',
    },
];

const data = [];
for (let i = 0; i < 46; i++) {
    data.push({
        key: i,
        stt: `${i}`,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
    });
}

export default class table extends React.Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
    };

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    render() {
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            selections: [
                Table.SELECTION_ALL,
                Table.SELECTION_INVERT,
                {
                    key: 'odd',
                    text: 'Select Odd Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return false;
                            }
                            return true;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
                {
                    key: 'even',
                    text: 'Select Even Row',
                    onSelect: changableRowKeys => {
                        let newSelectedRowKeys = [];
                        newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                            if (index % 2 !== 0) {
                                return true;
                            }
                            return false;
                        });
                        this.setState({ selectedRowKeys: newSelectedRowKeys });
                    },
                },
            ],
        };
        return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
    }
}

ReactDOM.render(<table />, document.getElementById('root'));

