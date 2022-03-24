import { makeAutoObservable } from "mobx";
import request from "../util/request";
export class User {
  constructor(){
    makeAutoObservable(this);
  }
  async login({data , callback}: any){
    console.log('datadata',data);
    
    let res = await request('/user/login' , data , {method: "post"});
    console.log('res' , res);
    
    callback?.(res)
  }
} 

export default User;