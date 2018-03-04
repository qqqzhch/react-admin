/**
 * Created by hao.cheng on 2017/5/3.
 */
import React from 'react';
import _ from 'lodash';
import { Row, Col, Card, Timeline, Icon,Tabs,Button,Menu, Dropdown,Radio,Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import EchartsViews from './EchartsViews';
import EchartsArea from './EchartsArea';
import b1 from '../../style/imgs/b1.jpg';
import css from './cus.css';



import 'whatwg-fetch'
const ReactHighcharts = require('react-highcharts');

const TabPane = Tabs.TabPane;
const menu = (
  <Menu>
    <Menu.Item>
      新用用户数
    </Menu.Item>
    <Menu.Item>
      访问人数
    </Menu.Item>
    <Menu.Item>
      访问次数
    </Menu.Item>
  </Menu>
);


const columns = [{
    title: '页面',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
}, {
    title: '访问次数',
    dataIndex: 'age',
    key: 'age',
}];

const data = [{
    key: '1',
    name: 'John Brown',
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


function dataForDay(data) {
  return  _.map(data,function(item) {
    return {
      x:item.index+1,
      y:item.item.num!=undefined?item.item.num:0
    }
  })
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      today:null,
    };
  }
  componentDidMount() {
    var _this=this;
      fetch('/showdata/9885790/present_and_past ')
        .then(function(response) {
          return response.json()
        }).then(function(jsonData) {
           _this.setState({
             today:jsonData

           })
        })
        fetch('/showdata/9885790/page_line/0')
          .then(function(response) {
            return response.json()
          }).then(function(jsonData) {
             _this.setState({
               chart:{
                   name: '访问次数',
                   data: dataForDay(jsonData)
               }

             })
          })

    }
    today(data){
      return (
        <Row gutter={10}>
        <Col className="gutter-row" md={4}>
            <div className="gutter-box">
                <Card bordered={false}>
                    <div className="clear y-center">

                        <div className="clear">
                            <div className="text-muted">&nbsp;</div>
                            <h2>今日</h2>
                        </div>
                    </div>
                </Card>
            </div>
            <div className="gutter-box">
                <Card bordered={false}>
                    <div className="clear y-center">

                        <div className="clear">
                            <div className="text-muted">昨日</div>

                        </div>
                    </div>
                </Card>
            </div>

        </Col>
            <Col className="gutter-row" md={4}>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">新用户数</div>
                                <h2>{data.today.newVistior}</h2>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">{data.Yesterday.newVistior}</div>

                            </div>
                        </div>
                    </Card>
                </div>

            </Col>
            <Col className="gutter-row" md={4}>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">访问人数</div>
                                <h2>{data.today.vistiorMan}</h2>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">{data.Yesterday.vistiorMan}</div>

                            </div>
                        </div>
                    </Card>
                </div>

            </Col>
            <Col className="gutter-row" md={4}>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">访问次数</div>
                                <h2>{data.today.vistiorPage}</h2>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">{data.Yesterday.vistiorPage}</div>

                            </div>
                        </div>
                    </Card>
                </div>

            </Col>
            <Col className="gutter-row" md={4}>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">跳出率</div>
                                <h2>{data.today.bounceNum||0}</h2>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="gutter-box">
                    <Card bordered={false}>
                        <div className="clear y-center">

                            <div className="clear">
                                <div className="text-muted">{data.Yesterday.bounceNum}</div>

                            </div>
                        </div>
                    </Card>
                </div>

            </Col>



        </Row>
      )

    }
    render() {
console.log(this.state.chart)

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
    series: [this.state.chart],
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

        return (

            <div className="gutter-example button-demo">
                <BreadcrumbCustom />
                {this.state.today?this.today(this.state.today):null}

                <Row gutter={10}>
                <Col className="gutter-row" >
                    <div className="gutter-box">
                        <Card
                        title={ <Radio.Group >
                                <Radio.Button value="large">今天</Radio.Button>
                                <Radio.Button value="default">昨天</Radio.Button>

                            </Radio.Group>}

                        bordered={false} className={'no-padding'}>
                        <Dropdown overlay={menu}>
   <a className="ant-dropdown-link">
        <Button>请选择指标</Button><Icon type="down" />
   </a>
 </Dropdown>
 <div>
 {this.state.chart?(<ReactHighcharts config = {config}></ReactHighcharts>):(null)}

 </div>
                        </Card>
                    </div>
                </Col>


                </Row>
                <Row gutter={10}>

                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>TOP10的受访页面</h3>
                                </div>
                                <div className="ant-table-body">
                                <Table columns={columns} dataSource={data} />


                                </div>



                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>TOP10的受访页面</h3>
                                </div>
                                <div className="ant-table-body">
                                <Table columns={columns} dataSource={data} />


                                </div>



                            </Card>
                        </div>
                    </Col>
                    <Col className="gutter-row" md={8}>
                        <div className="gutter-box">
                            <Card bordered={false}>
                                <div className="pb-m">
                                    <h3>TOP10的受访页面</h3>
                                </div>
                                <div className="ant-table-body">
                                <Table columns={columns} dataSource={data} />


                                </div>



                            </Card>
                        </div>
                    </Col>

                </Row>

            </div>
        )
    }
}

export default Dashboard;
