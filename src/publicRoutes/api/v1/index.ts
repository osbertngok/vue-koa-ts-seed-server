import * as Router from 'koa-router';
import * as cp from 'child_process';
import {Context} from 'koa';
export const v1Router = new Router();

v1Router.get('/ping', async (ctx: Context, next) => {
  ctx.status = 200;
  ctx.body = cp.spawn('ping', ['-c', '10', 'google.com']).stdout;
});
