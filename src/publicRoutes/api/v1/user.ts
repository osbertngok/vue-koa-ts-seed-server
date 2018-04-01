import * as Router from "koa-router";
import {Context} from "koa";
import * as passport from 'koa-passport';

export const userRouter = new Router();

userRouter.get('/', async (ctx: Context, next) => {
    if (ctx.isAuthenticated()) {
        ctx.status = 200;
        ctx.body = ctx.state.user;
    } else {
        ctx.status = 200;
        ctx.body = null;
    }
});

userRouter.get('/login', async (ctx: Context, next) => {
    ctx.status = 405;
    ctx.body = {
        success: false,
        error: 'use_post_instead'
    };
});

userRouter.get('/logout', async (ctx: Context, next) => {
    ctx.status = 405;
    ctx.body = {
        success: false,
        error: 'use_post_instead'
    };
});

userRouter.post('/login', async (ctx: Context, next) => {
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

userRouter.post('/logout', async (ctx: Context, next) => {
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