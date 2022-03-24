export function checkCode(code: number){
  return code === CodeMap.SUCCESS
}

export enum CodeMap {
  SUCCESS = 200000
} 