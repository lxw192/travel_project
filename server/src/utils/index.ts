import md5 = require('md5');
import * as fs from 'fs';
import { SALT } from '../config';
import { Observer } from 'rxjs';

export class Utils {
  static encrypt(s: string) {
    const ss = md5(md5(s + SALT));
    console.log('TCL: Utils -> encrypt -> ss', ss);

    return ss;
  }

  static async writeFile(file, content) {
    return new Promise((resolve, reject) => {
      fs.writeFile(file, content, { flag: 'w' }, (err) => {
        console.log('TCL: CommonController -> upload -> err', err);
        if (err) {
          reject(err);
          return;
        }
        resolve(true);
      });
    });
  }

  static async getObserverVal<T>(observer): Promise<T> {
    return new Promise((resolve, reject) => {
      let val: T = null;
      const ob: Observer<T> = {
        next: (value: T) => {
          val = value;
        },
        error: (err) => {
          reject(err);
        },
        complete: () => {
          resolve(val);
        },
      };
      observer.subscribe(ob);
    });
  }

  static treeForEach(
    data: any[],
    cb: (item: any, index: number, parentItem: any) => void,
    parentItem?: null,
  ): void {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      cb(item, i, parentItem);
      if (item.children) {
        Utils.treeForEach(item.children, cb, item);
      }
    }
  }

  static async treeForOf(
    data: any[],
    cb: (item: any, parentItem: any) => void,
    childrenKey = 'children',
    parentItem?: null,
  ) {
    for (const item of data) {
      await cb(item, data);
      if (item[childrenKey]) {
        await Utils.treeForOf(item[childrenKey], cb, childrenKey, item);
      }
    }
  }

  static treeMap(
    data: any[],
    cb: (item: any, index: number, parentItem: any) => any,
    parentItem?: null,
  ): any[] {
    return data.map((item, index) => {
      let children = item.children;
      if (children) {
        const newItem = cb({ ...item }, index, parentItem);
        children = Utils.treeMap(children, cb, item);
        return {
          ...newItem,
          children,
        };
      } else {
        return cb(item, index, parentItem);
      }
    });
  }
  static treeToArr(data: any[]): any[] {
    let arr = [];

    data.forEach((item) => {
      const children = item.children;
      if (children) {
        const childrenArr = Utils.treeToArr(item.children);
        arr = [...arr, ...childrenArr];
      } else {
        arr.push(item);
      }
    });

    return arr;
  }
}
