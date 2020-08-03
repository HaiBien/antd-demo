import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import DatasetList from './dataset.list'
import { Layout, Typography, Space, Button, Modal } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateDataset from './create-dataset'
import EditDataset from './edit-dataset'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './../index.css'
import './dataset.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolderPlus, faTrashAlt, faListUl } from '@fortawesome/free-solid-svg-icons'

const {  Content } = Layout;
const { Text } = Typography;
const { confirm } = Modal;



export default class DatasetIndex extends React.Component {

  state = {
    modal1Visible: false,
    modal2Visible: false,
    datasets: [],
    checkedList: null,
    indeterminate: true,
    checkAll: false,
    checkEdit: false,
    id: ''
  };

  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }

  showConfirmDelete = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Nội dung đã xóa sẽ không thể khôi phục lại!',
      onOk() {
        var checkbox = document.getElementsByName('dataset');
        let array = [];
        var a = 0;
        for (var i = 0; i < checkbox.length; i++) {
          if (checkbox[i].checked === true) {
            array[a] = checkbox[i].id;
            a++;
          }
        }
        console.log(array);
        while (a >= 0) {
          axios.delete('http://localhost:3001/api/v1/datasets/' + array[a])
            .then(
              a--
            )
            .catch(err => {
              console.error(err)
            })
        }
        toast.success('Xóa thành công!', { autoClose: 2000, pauseOnHover: false })
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  checkAll() {
    var onCheck = document.getElementsByName("dataset");
    var check = document.getElementsByName('check');
    for (var i = 0; i < onCheck.length; i++) {
      if (onCheck[i].checked !== check[0].checked) {
        onCheck[i].checked = !onCheck[i].checked
        console.log(onCheck[i].id + '  checker = ' + onCheck[i].checked)
      }
    }
  }

  checkEdit() {
    var checkbox = document.getElementsByName('dataset');
    let value;
    let i = 0;
    while (i < checkbox.length) {
      if (checkbox[i].checked === true) {
        value = checkbox[i].id
        // i = checkbox.length
        this.setState({id: value})
        break;
      }
      else {
        i++;
      }
    }
    console.log("value        "+ value)
   // return value;
    
    console.log('state         ' + this.state.id);
  }

  render() {

    return (
      <Router>
        <Layout>
          <Content className="site-layout">
            <Text className="text-header size-2"> <FontAwesomeIcon icon={faListUl} /> List Datasets</Text><br />
            <hr />
            <Space size={12}>
              <div>
                <input type='checkbox' className="size-2" name='check' onChange={this.checkAll} /><span className='size-2'> Check all</span>
              </div>
              <Button type="text" onClick={() => this.setModal1Visible(true)}>
                <FontAwesomeIcon className='size-1-5' style={{ color: '#1890FF' }} icon={faFolderPlus} />
              </Button>

              {/* <Link to={"/dataset/edit/" + this.checkEdit()} > */}
              <Button type="text" onClick={() => {this.setModal2Visible(true); this.checkEdit();}}>
                <FontAwesomeIcon className='size-1-5' style={{ color: '#1890FF' }} icon={faEdit} />
              </Button>
              {/* </Link> */}

              <Button type="text" onClick={this.showConfirmDelete}>
                <FontAwesomeIcon className='size-1-5' style={{ color: '#1890FF' }} icon={faTrashAlt} />
              </Button>

            </Space>
            <Modal
              title="Create dataset"
              style={{ top: 50 }}
              visible={this.state.modal1Visible}
              onOk={() => this.setModal1Visible(false)}
              onCancel={() => this.setModal1Visible(false)}
              footer={[
                <Button key="back" danger onClick={() => this.setModal1Visible(false)}>
                  Cancel
                  </Button>,
                <Button
                  key="submit"
                  type="submit"
                  form="myForm"
                  htmlType="submit"
                  onClick={() => this.setModal1Visible(false)}
                >
                  Submit
                  </Button>
              ]}
            >
              <CreateDataset />
            </Modal>

            <Modal
              title="Edit dataset"
              style={{ top: 50 }}
              visible={this.state.modal2Visible}
              onOk={() => this.setModal2Visible(false)}
              onCancel={() => this.setModal2Visible(false)}
              footer={[
                <Button key="back" danger onClick={() => this.setModal2Visible(false)}>
                  Cancel
                  </Button>,
                <Button
                  key="submit"
                  type="submit"
                  form="myFormEdit"
                  htmlType="submit"
                  onClick={() => this.setModal2Visible(false)}
                >
                  Ok
                  </Button>
              ]}
            >
              <EditDataset item={this.state.id} />
              {/* <Route path="/dataset/edit/:id" component={EditDataset} /> */}
            </Modal>
            {/* <Route path="/dataset/edit/:id" component={EditDataset} /> */}
            <DatasetList />
          </Content>
          {/* </Content> */}
        </Layout>
      </Router>
    );
  }
}
ReactDOM.render(<DatasetIndex />, document.getElementById('root'));
