import React from 'react';
import _ from 'lodash';
import { Row, Col, Card, Timeline, Icon,Tabs,Button,Menu, Dropdown,Radio,Table } from 'antd';
import BreadcrumbCustom from '../BreadcrumbCustom';
import css from './cus.css';
import 'whatwg-fetch';


class Trend extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
    };
  }
  componentDidMount() {

  }
  render() {
    return (<div className="gutter-example">
        <BreadcrumbCustom first="趋势" second="" />
        <Row gutter={16}>
            <Col className="gutter-row" md={24}>
                <div className="gutter-box">
                    <Card title="固定列" bordered={false}>

                    </Card>
                </div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="可展开" bordered={false}>

                    </Card>
                </div>
            </Col>
            <Col className="gutter-row" md={12}>
                <div className="gutter-box">
                    <Card title="可编辑" bordered={false}>

                    </Card>
                </div>
            </Col>
        </Row>
    </div>)
  }

}


export default Trend;
