import * as send from 'koa-send';
import * as path from 'path';
import * as fs from 'fs';
import {Context, Middleware} from 'koa';
import {IEnable} from './interfaces';

const isArray = (a: any): boolean => (!!a) && (a.constructor === Array);
const isObject = (a: any): boolean => (!!a) && (a.constructor === Object);

export const objectFormatMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  await next();
  const format = ctx.request.query.format;
  if (format) {
    switch (format) {
      case 'pretty':
        if (isArray(ctx.body) || isObject(ctx.body)) {
          ctx.body = JSON.stringify(ctx.body, null, 4);
        }
        break;
      default:
        break;
    }
  }
};

export const requireAuthentication = (ctx: Context) => {
  const url = ctx.request.url;
  if (url.substr(0, 4) === '/api') {
    return true;
  }
  return false;
};

export const authMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  console.log(`Auth Status: ${ctx.isAuthenticated()}`);
  if (!requireAuthentication(ctx) || ctx.isAuthenticated()) {
    await next();
    return;
  } else {
    ctx.redirect('/#/login');
  }
};

export let maintenaceMiddleware: Middleware & IEnable;

(() => {
  let isUnderMaintenance = true;
  maintenaceMiddleware = (async (ctx: Context, next: () => Promise<any>) => {
    if (isUnderMaintenance) {
      ctx.type = 'html';
      ctx.body = fs.createReadStream(path.join(__dirname, '../../public/maintenance.html'));
    } else {
      await next();
    }
  }) as Middleware & IEnable;

  maintenaceMiddleware.enable = () => {
    isUnderMaintenance = true;
  };

  maintenaceMiddleware.disable = () => {
    isUnderMaintenance = false;
  };
})();


export const redirectToRootMiddleware = async (ctx: Context, next: () => Promise<any>) => {
  if (ctx.request.path.indexOf('/iteration') === 0) {
    await send(ctx, 'index.html', { root: __dirname + '/../../public' });
  } else {
    await next();
  }
};
