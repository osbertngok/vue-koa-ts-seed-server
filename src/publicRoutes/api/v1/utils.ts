import * as Router from "koa-router";
import {Context} from "koa";
import * as cp from 'child_process';

export const utilsRouter = new Router();

utilsRouter.get('/ping', async (ctx: Context, next) => {
    ctx.status = 200;
    ctx.body = cp.spawn('ping', ['-c', '10', 'google.com']).stdout;
});