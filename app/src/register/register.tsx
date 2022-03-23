import { Button, Form, Input } from 'antd';
import React from 'react';
import styles from './register.module.less';

class Register extends React.Component {
  constructor(porps: any) {
    super(porps);
  }
  onSubmit=(value: any)=>{
    console.log('value' , value)
  }

  render() {
    return (
      <div className={styles.backgroundStyle}>
        <div className={styles.registerBox}>
          <Form onFinish={this.onSubmit}>
            <Form.Item
              label='账号'
              name='name'
              rules={[{required: true , message: '此项是必填项'}]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }} >
              <Input placeholder='请输入手机号' />
            </Form.Item>
            <Form.Item
              label='密码'
              name='password'
              rules={[{required: true , message: '此项是必填项'}]}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 12 }} >
              <Input placeholder='请输入密码' />
            </Form.Item>
           <Button htmlType="submit" type='primary' style={{width: 300}}>立即注册</Button>
           <div className={styles.agreementBox}>注册视为同意《马蜂窝用户使用协议》</div>
          </Form>
        </div>
      </div>
    )
  }
}
export default Register;