import React from 'react';
import ReactDOM from 'react-dom';
import store from '../src/state/store'
import { Layout, Menu } from 'antd';
import { DatabaseOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import Dataset from './component/dataset/dataset.index'
import OverView from './component/overView/view.index'
import Model from './component/model/model.index'
import Deploy from './component/deploy/deploy.index'
import User from './component/setting/user/user.index'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
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


ReactDOM.render(
  <Provider store={store}>
  <Index />
  </Provider>
, document.getElementById('root'));