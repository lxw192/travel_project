import React from 'react';
import styles from './register.less';

class Register extends React.Component{
  constructor(porps: any){
    super(porps);
  }
  render(){
    return (
      <div className={styles.backgroundStyle}>
        我是 register
      </div>
    )
  }
}
export default Register;