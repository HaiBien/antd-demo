import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { BrowserRouter as Router } from 'react-router-dom';
import 'antd/dist/antd.css';
import '../../../../src/index.css'
const { Content } = Layout;
const { Title } = Typography

export default class UserIndex extends React.Component {

    render() {
        return (
            <Router>
                <Layout style={{ padding: '0 24px 24px' }}>
                    <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item> <HomeOutlined /> Home</Breadcrumb.Item>
                        <Breadcrumb.Item> setting</Breadcrumb.Item>
                        <Breadcrumb.Item> user</Breadcrumb.Item>
                    </Breadcrumb>
                    <Content className="Content">

                        {/* <Header className="header-content" >

          <Text className="text-header" ><UnorderedListOutlined /> List Datasets</Text>
        </Header> */}

                        <Content className="site-layout">
                            <Title>User</Title>



                        </Content>
                    </Content>
                </Layout>
            </Router>
        );

    }
}
ReactDOM.render(<UserIndex />, document.getElementById('root'));
