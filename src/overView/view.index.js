import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Breadcrumb, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import './../index.css'
const { Content } = Layout;
const { Title } = Typography

export default class ViewIndex extends React.Component {

  render() {
    return (<Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item  ><HomeOutlined /> Home</Breadcrumb.Item>
      </Breadcrumb>
      <Content className="Content">
        {/* <Header className="header-content" >

          <Text className="text-header" ><UnorderedListOutlined /> List Datasets</Text>
        </Header> */}
        <Content className="site-layout">
          <Title>Over View</Title>



        </Content>
      </Content>
    </Layout>
    );

  }
}
ReactDOM.render(<ViewIndex />, document.getElementById('root'));
