import { HttpException } from '@nestjs/common';
import { ObjectLiteral } from '../interface/common';
import * as json5 from 'json5';
// import decodeUriComponent from 'decode-uri-component';
const decodeUriComponent = require('decode-uri-component');

export class Http extends HttpException {
  static succThrow(data = {}, msg?: string) {
    throw new HttpException(Http.succ(data, msg), 200);
  }
  static succ(data = {}, msg?: string) {
    return {
      code: 200000,
      msg: msg || '成功',
      data,
    };
  }

  static failThrow(code, msg?, data?) {
    throw new HttpException(Http.fail(code, msg, data), 200);
  }
  static fail(code, msg?, data?) {
    return {
      code,
      msg: msg || '失败',
      data: data || {},
    };
  }
  static error(code, msg?, data?) {
    throw new HttpException(
      {
        code,
        msg: msg || '错误',
        data: data || {},
      },
      500,
    );
  }

  static getReqData(req, key) {
    let data = {};
    if (Http.isBody(req)) {
      data = req.body;
    } else if (Http.isGet(req)) {
      data = req.query;
    }

    return data;
  }
  static getReqDataByData(req, key = 'data') {
    console.log("🚀 ~ file: Http.ts ~ line 55 ~ Http ~ getReqDataByData ~ req.query.data", req.query.data)
    console.log("🚀 ~ file: Http.ts ~ line 56 ~ Http ~ getReqDataByData ~ decodeUriComponent", decodeUriComponent)
    let data = null;
    if (Http.isGet(req)) {
      if (req.query.data) {
        try {
          data = json5.parse(decodeUriComponent(req.query.data));
        } catch (e) {
          // this.logger.error(e)
          console.error(e, 'req.query.data 非合法 json5')
        }
      } else {
        try {
          const dataStr = decodeUriComponent(req.querystring).trim();

          if (
            dataStr &&
            dataStr.indexOf('{') === 0 &&
            dataStr.lastIndexOf('}') === dataStr.length - 1
          ) {
            const newData = json5.parse(dataStr);
            if (typeof newData === 'object') {
              data = newData;
            }
          }
        } catch (e) {
          // this.logger.error(e)
        }
      }
    }

    data = data || Http.getReqData(req, key);

    // console.log('​getReqDataByData -> data', data)
    return data;
  }
  static isBody(req) {
    return Http.isPost(req) || Http.isPut(req) || Http.isPatch(req);
  }
  static isPost(req) {
    return req.method.toLocaleUpperCase() === 'POST';
  }
  static isPut(req) {
    return req.method.toLocaleUpperCase() === 'PUT';
  }
  static isDelete(req) {
    return req.method.toLocaleUpperCase() === 'DELETE';
  }
  static isHead(req) {
    return req.method.toLocaleUpperCase() === 'HEAD';
  }
  static isOptions(req) {
    return req.method.toLocaleUpperCase() === 'OPTIONS';
  }
  static isPatch(req) {
    return req.method.toLocaleUpperCase() === 'PATCH';
  }
  static isGet(req) {
    return req.method === 'GET';
  }
}

export const success = (): MethodDecorator => {
  return (_, __, descriptor: PropertyDescriptor) => {
    const originValue = descriptor.value;
    const self = this;
    // async function
    // newF.prototype = originValue.prototype;
    descriptor.value = async function (...args) {
      const value = await originValue.apply(this, args);
      return Http.succ(value);
    };

    return descriptor;
  };
};

export const fail = (): MethodDecorator => {
  return (_, __, descriptor: PropertyDescriptor) => {
    const originValue = descriptor.value;
    descriptor.value = async function (...args) {
      const value = await originValue.apply(this, ...args);
      return Http.fail(value);
    };

    return descriptor;
  };
};

export interface HttpData<T extends ObjectLiteral> {
  code: number;
  msg: string;
  data: T | PageData<T>;
}

export interface PageData<T extends ObjectLiteral> {
  total: number;
  page: number;
  list: T[];
}
