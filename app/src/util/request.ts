import { message } from "antd";
import axios from "axios";

export default async function request( 
  url: string,
  data: any,
  options: any = { method: "GET" }
  ){

    let newOptions = { ...options, data: data };

    if (
      newOptions.method === "POST" ||
      newOptions.method === "PUT" ||
      newOptions.method === "DELETE"
    ) {
      if (!(newOptions.data instanceof FormData)) {
        newOptions.headers = {
          Accept: "application/json",
          "Content-Type": "application/json; charset=utf-8",
          ...newOptions.headers,
        };
        newOptions.data = JSON.stringify(newOptions.data);
      } else {
        // newOptions.data is FormData
        newOptions.headers = {
          Accept: "application/json",
          ...newOptions.headers,
        };
      }
    } else if (newOptions.method === "GET") {
      newOptions.params = newOptions.data;
      newOptions.headers = {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        ...newOptions.headers,
      };
    }
    newOptions.url = newOptions.url || url;

  console.log('newOptionnewOptionnewOption' , newOptions);
  
  return axios(newOptions).then((res:any)=>{
    try{
      if(checkStatus(res)){ }
      return res?.data;
    }catch(err){
      console.log(err);
    }
  })
}


export function checkStatus(res: any){
  const code = res?.data?.code;
  const msg = res?.data?.msg;
  if(code === 200000){
    message.success('成功')
    return true
  }else{
    message.error(msg || '')
    return false
  }
}