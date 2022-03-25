import { Button, Carousel } from 'antd';
import request from '../util/request';
import React from 'react';
import styles from './index.module.less';
import { CarouselRef } from 'antd/lib/carousel';

interface Iprops {};
interface Istate {
  current: number;
};

class Home extends React.Component<Iprops,Istate>{
  carouselRef = React.createRef<CarouselRef>();
  constructor(porps: any){
    super(porps);
    this.state={
      current: 0
    }
  }
  beforeChange=(f:number , t: number)=>{
    console.log(f , t);
    this.setState({
      current: t
    })
  }
  carouselItemClick=(item: number)=>{
    this.carouselRef?.current?.goTo(item)
  }
  renderCarouselItem=(type?: string)=>{
    const { current } = this.state;
    const imageArray=['1' , '2' , '3' ,'4'];
    if(type === 'Thumbnail' ){
      return (
        imageArray.map((item , index)=><div onClick={this.carouselItemClick.bind(this , index)}>
          <img style={{ width: 140 , height: 60, overflow: 'hidden' , marginBottom: 20 , cursor: 'pointer', border: current === index? '1px solid #ff9d00': '0px'}} src={require(`../../static/images/${item}.jpg`)} alt="" />
        </div>)
      )
    }
    return (
      imageArray.map(item=><div>
        <img style={{width: '100%' , height: 500 , overflow: 'hidden'}} src={require(`../../static/images/${item}.jpg`)} alt="" />
      </div>)
    )
  }
  render(){
    return (
      <div className={styles.carouselBox}>
        <div className={styles.carouselThumbnail}>
          {this.renderCarouselItem('Thumbnail')}
        </div>
        <Carousel ref={this.carouselRef} dotPosition={'bottom'} dots={false} autoplay beforeChange={this.beforeChange}>
          {this.renderCarouselItem()}
      </Carousel>
      </div>
    )
  }
}
export default Home;