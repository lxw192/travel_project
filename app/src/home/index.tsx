import { Button } from 'antd';
import request from '../util/request';
import React from 'react';

class Home extends React.Component{
  constructor(porps: any){
    super(porps);
  }
  onClick=()=>{
    // request('/api/user/logout', {} , {})
    request('api/feature-toggle/page', {} , {})
  }

  render(){
    return (
      <div>
        我是 home页面
        <Button onClick={this.onClick}>按钮</Button>
      </div>
    )
  }
}
export default Home;