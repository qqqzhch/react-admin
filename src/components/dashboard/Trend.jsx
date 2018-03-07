import React from 'react';
import _ from 'lodash';
import { Row, Col, Card, Timeline, Icon,Tabs,Button,Menu, Dropdown,Radio,Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import css from './cus.css';
import 'whatwg-fetch';
import * as moment from 'moment';


const ReactHighcharts = require('react-highcharts');

function dataForDay(data) {
  console.log(moment)
  return  _.map(data,function(item) {
    return {
      x:moment(item.time).toDate().getTime(),
      // x:item.time,
      y:item.item.num!=undefined?item.item.num:0
    }
  })
}

const columns = [{
    title: '时间',
    dataIndex: 'time',
    key: 'time',
    render: text => <a href="#/app/dashboard/index">{text}</a>,
}, {
    title: '指标',
    dataIndex: 'age',
    key: 'age',
}];
var keyvalue={
  new_vistior_line:'新用用户数',
  vistior_line:'访问人数',
  page_line:'访问次数'
}

class Trend extends React.Component {
  constructor(props) {
    super(props);
    this.daytypeclick=this.daytypeclick.bind(this);


    this.state = {
      linetoday:1,
      linetype:'page_line'
    };
  }
  componentDidMount() {
    this.getlinedata(1,'page_line');

  }
  menu = (
    <Menu onClick={this.handleMenuClick.bind(this)}>
      <Menu.Item key="new_vistior_line" >
        新用用户数
      </Menu.Item>
      <Menu.Item key="vistior_line">
        访问人数
      </Menu.Item>
      <Menu.Item key="page_line">
        访问次数
      </Menu.Item>
    </Menu>
  );
  getlinedata(today,linetype) {
    var _this=this;
    this.setState({linetoday:today,linetype:linetype})
    fetch('/showdata/9885790/'+linetype+'/'+today)
      .then(function(response) {
        return response.json()
      }).then(function(jsonData) {
         _this.setState({
           listData:jsonData,
           chart:{
               name: keyvalue[linetype],
               data: dataForDay(jsonData)
           }

         })
      })
  }
  handleMenuClick(e){
    console.log(e.key);
    this.getlinedata(this.state.linetoday,e.key)

  }
  daytypeclick(e){
   console.log(e.target.value)
   this.getlinedata(e.target.value,this.state.linetype)
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
        type:'datetime'
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
    return (<div className="gutter-example">
        <BreadcrumbCustom first="趋势" second="" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card bordered={false}
                    title={ <Radio.Group onChange={this.daytypeclick} >
                            <Radio.Button value="0">今天</Radio.Button>
                            <Radio.Button value="-1">昨天</Radio.Button>
                            <Radio.Button value="7">最近7天</Radio.Button>
                            <Radio.Button value="30">最近30天</Radio.Button>

                        </Radio.Group>}>
                        <Dropdown overlay={this.menu}>
                           <a className="ant-dropdown-link">
                                <Button>请选择指标</Button><Icon type="down" />
                           </a>
                         </Dropdown>
                        {this.state.chart?(<ReactHighcharts config = {config}></ReactHighcharts>):(null)}

                    </Card>
                </div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="" bordered={false}>
                    {this.state.listData?(<Table pagination={false} columns={columns} dataSource={this.state.listData} />):(null)}

                    </Card>
                </div>
            </Col>

        </Row>
    </div>)
  }

}


export default Trend;
