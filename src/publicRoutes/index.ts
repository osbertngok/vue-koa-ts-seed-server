import * as Router from 'koa-router';
export const rootRouter = new Router();
import {apiRouter} from './api';
import * as passport from 'koa-passport';
import {Context} from 'koa';

rootRouter.use('/api', apiRouter.routes());
rootRouter.get('/user', async (ctx: Context, next) => {
  if (ctx.isAuthenticated()) {
    ctx.status = 200;
    ctx.body = ctx.state.user;
  } else {
    ctx.status = 200;
    ctx.body = null;
  }
});

rootRouter.post('/login', async (ctx: Context, next) => {
  try {
    await passport.authenticate('local')(ctx, async () => {
      return undefined;
    });
  } catch (e) {
    ctx.status = 401;
    ctx.body = {
      success: false,
      error: 'access_denied',
    };
    return;
  }
  ctx.status = 200;
  ctx.body = ctx.state.user;
  await next();
});

rootRouter.post('/logout', async (ctx: Context, next) => {
  try {
    await ctx.logout();
  } catch (e) {
    ctx.status = 500;
    ctx.body = {
      success: false,
      error: 'logout_error',
    };
    return;
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    error: null,
  };
});
