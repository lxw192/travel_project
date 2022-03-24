import { Button, Form, Input } from 'antd';
import React from 'react';
import { inject, observer } from "mobx-react";
import { History } from 'history';
import request from '../util/request';
import styles from './register.module.less';
import User from '../models/User';
import { NavigateFunction } from 'react-router-dom';
import anoyCom from '../routers/anonyCom';
import { checkCode } from '../util/util';

interface Iprops {
  user: User;
  navigate: NavigateFunction;
}

@inject('user')
@observer
class Login extends React.Component<Iprops> {
  constructor(porps: any) {
    super(porps);
  }
  onSubmit = (value: any) => {
    const { user , navigate } = this.props;
    
    user.login({
      data: value,
      callback: (res:any)=>{
        if(checkCode(res?.code)){
          navigate('/')
        }
      }
    })
  }

  render() {
    return (
      <div className={styles.backgroundStyle}>
        <div className={styles.registerBox}>
          <Form onFinish={this.onSubmit}>
            <Form.Item
              label='账号'
              name='name'
              rules={[{ required: true, message: '此项是必填项' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }} >
              <Input placeholder='请输入手机号' />
            </Form.Item>
            <Form.Item
              label='密码'
              name='pass'
              rules={[{ required: true, message: '此项是必填项' }]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }} >
              <Input placeholder='请输入密码' />
            </Form.Item>
            <Button htmlType="submit" type='primary' style={{ width: 300 }}>立即登录</Button>
          </Form>
          <div className={styles.otherLogin}>
            <div>其他账号登录</div>
          </div>
        </div>
      </div>
    )
  }
}
export default anoyCom(Login)