import React from 'react';
import 'antd/dist/antd.css';
import { Layout, Typography, Space, Button, Modal, notification } from 'antd';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateDataset from './create-dataset'
import EditDataset from './edit-dataset'
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../../../src/index.css'
import './dataset.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faFolderPlus, faTrashAlt, faListUl } from '@fortawesome/free-solid-svg-icons'
import { deleteDataset, checkItem, checkAllItem, LoadEditDataset } from '../../api/fetchDataset';
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
      id: '',
      check: false,
    };
    this.checkAll = this.checkAll.bind(this);
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
        notification.success({ message: "success", duration: 2.5 });

      },
      onCancel() {
      },
    });
  }

  loadEdit() {
    this.props.LoadEditDataset(this.props.id)
  }

  async checkAll() {
    var onCheck = document.getElementsByName("dataset");
    var check = document.getElementsByName('check');
    if(this.props.checkA === true)
    {
      this.props.checkAllItem(false)
    } else {
      this.props.checkAllItem(true)
    }
    for (var i = 0; i < onCheck.length; i++) {
      if (onCheck[i].checked === this.props.checkA) {
        onCheck[i].checked = !onCheck[i].checked
      }
    }
    if (check[0].checked === true) {
      this.props.checkItem(this.props.datasets.data.length, true, false, true)
    } else {
      this.props.checkItem(0, true, true, false)
    }
    
  }

  componentDidMount() {
  }

  render() {
    const status = this.props.count
    const check = (this.props.checkA ? ' Unselected' : ' Selected');
    return (
      <Router>
        <Layout>
          <Content className="site-layout">
            <Text className="text-header size-2"> <FontAwesomeIcon icon={faListUl} /> List Datasets</Text><br />
            <hr />
            <Space size={12}>
              <div>
                <input type='checkbox' className="size-2" name='check' checked={this.props.checkA} onClick={this.checkAll} />
                <span className='size-2'>{check}</span>
              </div>
              <Button type="primary" id='create' onClick={() => this.setModal1Visible(true)}>
                <FontAwesomeIcon className='size-1-5' icon={faFolderPlus} />
              </Button>

              <Button type="primary" id='edit' onClick={() => { this.setModal2Visible(true); this.loadEdit() }} disabled={this.props.edit} >
                <FontAwesomeIcon className='size-1-5' icon={faEdit} />
              </Button>

              <Button type="primary" id='delete' onClick={this.showConfirmDelete} disabled={this.props.del}>
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
              <EditDataset />

            </Modal>
               <h4> count = {status}</h4>     
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
      edit: state.datasetsReducer.edit,
      del: state.datasetsReducer.del,
      datasets: state.datasetsReducer.datasets,
      checkA: state.datasetsReducer.checkA,
      id: state.datasetsReducer.id,

  })
};

export default connect(mapStateToProps,  { deleteDataset, checkItem, checkAllItem, LoadEditDataset } )(DatasetIndex);

