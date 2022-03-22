import { makeAutoObservable } from "mobx";
export class User {
  constructor(){
    makeAutoObservable(this);
  }
  
} 

export default User;