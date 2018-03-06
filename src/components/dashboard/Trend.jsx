import React from 'react';
import _ from 'lodash';
import { Row, Col, Card, Timeline, Icon,Tabs,Button,Menu, Dropdown,Radio,Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import css from './cus.css';
import 'whatwg-fetch';


const ReactHighcharts = require('react-highcharts');



const columns = [{
    title: '时间',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#/app/dashboard/index">{text}</a>,
}, {
    title: '指标',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a>Action 一 {record.name}</a>
      <span className="ant-divider" />
      <a>Delete</a>
      <span className="ant-divider" />
      <a className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
    ),
}];

const data = [{
    key: '1',
    name: 's',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];
class Trend extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
    };
  }
  componentDidMount() {

  }
  render() {
    var  config={
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    yAxis: {
        title: {
            text: ''
        }
    },
    xAxis: {
        type:'category'
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },
    series: [
      {
        name:'指标',
        data:[111,222,33334,4444]
      }

    ],
    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }
}
    return (<div className="gutter-example">
        <BreadcrumbCustom first="趋势" second="" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card bordered={false}
                    title={ <Radio.Group onChange={this.daytypeclick} >
                            <Radio.Button value="7">最近7天</Radio.Button>
                            <Radio.Button value="30">最近30天</Radio.Button>

                        </Radio.Group>}>
                        <ReactHighcharts config = {config}></ReactHighcharts>

                    </Card>
                </div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="可展开" bordered={false}>
                    <Table columns={columns} dataSource={data} />
                    </Card>
                </div>
            </Col>

        </Row>
    </div>)
  }

}


export default Trend;
