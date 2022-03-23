import React from 'react';

import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';


export default class MenuPage extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = (e: any) => {
    console.log('click ', e, this);
    this.setState({ current: e.key });

  };

  render() {
    const { current } = this.state;
    return (
      <div>
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
          <Menu.Item key="mail" icon={<MailOutlined />}>
            <Link to='/1' >首页</Link>
          </Menu.Item>
          <Menu.Item key="app1" icon={<AppstoreOutlined />}>
            <Link to='/2' >攻略</Link>
          </Menu.Item>
          <Menu.Item key="app2" icon={<AppstoreOutlined />}>
            <Link to='/3' >商城</Link>
          </Menu.Item>
          <Menu.Item key="app3" icon={<AppstoreOutlined />}>
            <Link to='/4' >酒店·民宿</Link>
          </Menu.Item>
          <Menu.Item key="app4" icon={<AppstoreOutlined />}>
            <Link to='/5' >特价酒店</Link>
          </Menu.Item>
          <Menu.Item key="app5" icon={<AppstoreOutlined />}>
            <Link to='/6' >论坛</Link>
          </Menu.Item>
        </Menu>
        <div>
          <Outlet />
        </div>
      </div>
    );
  }
}
