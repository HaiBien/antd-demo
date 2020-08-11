import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Typography, Space, Button, Modal } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateDataset from './create-dataset'
import EditDataset from './edit-dataset'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../src/index.css'
import './dataset.css'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolderPlus, faTrashAlt, faListUl } from '@fortawesome/free-solid-svg-icons'
import { deleteDataset } from '../../api/fetchDataset';
import { connect } from 'react-redux';
import DatasetList from './dataset.list';


const { Content } = Layout;
const { Text } = Typography;
const { confirm } = Modal;

class DatasetIndex extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1Visible: false,
      modal2Visible: false,
      checkAll: false,
      id: '',
      delete: true,
      edit: true,
    };
    this.checkAll = this.checkAll.bind(this);
    this.onCheck = this.onCheck.bind(this)

  }


  setModal1Visible(modal1Visible) {
    this.setState({ modal1Visible });
  }

  setModal2Visible(modal2Visible) {
    this.setState({ modal2Visible });
  }
  refresh = () => {
    window.location.reload();
  }

  showConfirmDelete = () => {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Nội dung đã xóa sẽ không thể khôi phục lại!',
      onOk: async () => {
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
          let res = await this.props.deleteDataset(array[a])
          a--
        }
        toast.success('Xóa thành công!', { autoClose: 2000, pauseOnHover: false })

      },
      onCancel() {
      },
    });
  }

  async checkAll() {
    var onCheck = document.getElementsByName("dataset");
    var check = document.getElementsByName('check');
    await this.setState({
      checkAll: !this.state.checkAll,
      edit: true,
    });
    if (this.state.checkAll === true) {
      this.setState({ delete: false })
    } else {
      this.setState({ delete: true })
    }
    for (var i = 0; i < onCheck.length; i++) {
      if (onCheck[i].checked !== check[0].checked) {
        onCheck[i].checked = !onCheck[i].checked
      }
    }
  }

  componentDidMount() {
    if(this.props.count > 0){
      this.setState({ delete: false})
    }
    if(this.props.count === 1) {
      this.setState({ edit: false})
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
        this.setState({ id: value })
        break;
      }
      else {
        i++;
      }
    }
  }
  
  async onCheck() {
    var value = document.getElementsByName("dataset");
    var dem = 0;
    for (var i = 0; i < value.length; i++) {
      if (value[i].checked === true) {
        dem++;
      }
    }
    await this.setState({ count: dem });
    if (this.state.count === 1) {
      this.setState({ edit: false });
    } else {
      this.setState({ edit: true });
    }
    if (this.state.count > 0) {
      this.setState({ delete: false });
    } else {
      this.setState({ delete: true });
    }
  }

  render() {
    const status = this.props.count
    const check = (this.state.checkAll ? ' Un selected' : ' Selected');
    return (
      <Router>
        <Layout>
          <Content className="site-layout">
            <Text className="text-header size-2"> <FontAwesomeIcon icon={faListUl} /> List Datasets</Text><br />
            <hr />
            <Space size={12}>
              <div>
                <input type='checkbox' className="size-2" name='check' onClick={this.checkAll} />
                <span className='size-2'>{check}</span>
              </div>
              <Button type="primary" id='create' onClick={() => this.setModal1Visible(true)}>
                <FontAwesomeIcon className='size-1-5' icon={faFolderPlus} />
              </Button>

              <Button type="primary" id='edit' onClick={() => { this.setModal2Visible(true); this.checkEdit(); }} disabled={this.state.edit} >
                <FontAwesomeIcon className='size-1-5' icon={faEdit} />
              </Button>

              <Button type="primary" id='delete' onClick={this.showConfirmDelete} disabled={this.state.delete}>
                <FontAwesomeIcon className='size-1-5' icon={faTrashAlt} />
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
                  onClick={() => {
                    this.setModal1Visible(false);
                  }}
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
              <EditDataset item={this.state.id} history={this.props.history} />

            </Modal>
            {status}
            { <DatasetList />}
          </Content>
        </Layout>
      </Router>
    );
  }

}

const mapStateToProps = (state) => {
  return ({
      count: state.datasetsReducer.count,
  })
};

export default connect(mapStateToProps,  { deleteDataset } )(DatasetIndex);

