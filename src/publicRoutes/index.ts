import * as Router from 'koa-router';
export const rootRouter = new Router();
import {apiRouter} from './api';
import {Context} from 'koa';

rootRouter.use('/api', apiRouter.routes());

rootRouter.all('/', async (ctx: Context, next) => {
  ctx.status = 403;
  ctx.body = {
    success: false,
      error: 'root_path_access_forbidden'
  };
});
