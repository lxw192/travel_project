import { Button, Form, Input } from 'antd';
import React from 'react';
import request from '../util/request';
import styles from './register.module.less';

class Register extends React.Component {
  constructor(porps: any) {
    super(porps);
  }
  onSubmit = (value: any) => {
    console.log('value', value)
    request('/user/register' , value , {method: 'Post'})
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
            <Button htmlType="submit" type='primary' style={{ width: 300 }}>立即注册</Button>
            <div className={styles.agreementBox}>注册视为同意《马蜂窝用户使用协议》。已有账号，<a href='/login'>去登陆</a></div>
          </Form>
          <div className={styles.otherLogin}>
            <div>其他账号登录</div>
          </div>
        </div>
      </div>
    )
  }
}
export default Register;