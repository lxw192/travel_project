import { Button, Carousel } from 'antd';
import request from '../util/request';
import React from 'react';
import styles from './index.module.less';

class Home extends React.Component{
  constructor(porps: any){
    super(porps);
  }
  onClick=()=>{
    request('/user/login', {name:'liuxiaowei' , pass: '123456'} , {method: 'POST'})
  }

  render(){
    const contentStyle = {height: 400 , background: '#ccc'}
    return (
      <div className={styles.carouselBox}>
        <Carousel dotPosition={'right'}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      </div>
    )
  }
}
export default Home;