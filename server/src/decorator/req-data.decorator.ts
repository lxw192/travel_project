import { Http } from './../common/Http';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReqData = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const reqData = Http.getReqDataByData(req);
    return {
      ...req.params,
      ...reqData,
    };
  },
);
