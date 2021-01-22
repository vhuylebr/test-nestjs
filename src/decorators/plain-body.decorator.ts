import {
  createParamDecorator,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import * as rawBody from 'raw-body';
import { Request } from 'express';

export const PlainBody = createParamDecorator(
  async (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest<Request>();
    if (!req.readable) {
      throw new BadRequestException('Invalid body');
    }
    const body = (await rawBody(req)).toString('utf8').trim();
    return body;
  },
);
