import axios from "axios";

export default async function request( 
  url: string,
  data: any,
  options: any = { method: "GET" }
  ){
  let newOption = {
    url, data ,options
  }
  return axios(newOption).then(res=>{
    console.log('111111111111111111111', res );
  })
}