

export function genMsg(type: any, data: any, meta: MsgDataMeta): MsgData {

  return {
    meta: {
      timestamp: Date.now() as unknown as string,
      ...meta,
    },
    data: {
      type,
      data,
    },
  };
}

export interface MsgData {
  meta: MsgDataMeta;
  data: MsgDataData
}

export interface MsgDataData {
  type: string;
  data: any;
}

export interface MsgDataMeta {
  timestamp?: string;
  userId?: string;
  [key: string]: any;
}
