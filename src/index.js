import React from 'react';
import ReactDOM from 'react-dom';
import { Layout, Menu } from 'antd';
import { DatabaseOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import Dataset from './dataset/dataset.index'
import OverView from './overView/view.index'
import Model from './model/model.index'
import Deploy from './deploy/deploy.index'
import User from './setting/user/user.index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { SubMenu } = Menu;
const { Header, Sider } = Layout;


export default class Index extends React.Component {

  render() {
    return (
      <Router>
        <Layout>
          <Header className="bg-content">
            <Menu theme="light" mode="horizontal" defaultSelectedKeys={['2']}>
            </Menu>
          </Header>
          <Layout>
            <Sider width={200} className="site-layout-background border-menu">
              <Menu
                mode="inline"
                defaultSelectedKeys={['sub0']}
                defaultOpenKeys={['sub0']}
                style={{ height: '100%'}}
              >
                <Menu.Item key="sub0" > <Link to="/" > HOME</Link></Menu.Item>
                <Menu.Item key="sub1" icon={<DatabaseOutlined />}><Link to="/dataset"> Datasets</Link></Menu.Item>
                <Menu.Item key="sub2" icon={<DatabaseOutlined />}><Link to="/model"> Model</Link></Menu.Item>
                <Menu.Item key="sub3" icon={<DatabaseOutlined />}> <Link to="/deploy"> Deploy</Link> </Menu.Item>
                <SubMenu key="sub4" icon={<SettingOutlined />} title="Setting">
                  <Menu.Item key="2" icon={<UserOutlined />} ><Link to="/setting/user" > User</Link></Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Route path="/" exact component={OverView} />
            <Route path="/dataset" component={Dataset} />
            <Route path="/model" component={Model} />
            <Route path="/deploy" component={Deploy} />
            <Route path="/setting/user" component={User} />

          </Layout>
        </Layout>
        <ToastContainer />
      </Router>
    );
  }
}


ReactDOM.render(<Index />, document.getElementById('root'));