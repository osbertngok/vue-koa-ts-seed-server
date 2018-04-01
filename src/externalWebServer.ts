import * as Koa from 'koa';
import * as convert from 'koa-convert';
import * as bodyParser from 'koa-bodyparser';
import * as session from 'koa-session';
import * as passport from 'koa-passport';
import * as etag from 'koa-etag';
import * as mount from 'koa-mount';
import * as serve from 'koa-static';
import * as getPort from 'get-port';
import * as config from './config';
import * as mw from './middleware';
import * as compress from 'koa-compress';
import * as logger from 'koa-logger';
import {Server} from 'http';
import * as sio from 'socket.io';
import {rootRouter} from './publicRoutes';

import './auth';
import {IStartAsync} from './interfaces';
import {Context} from 'koa';

export const app: Koa & IStartAsync = new Koa() as Koa & IStartAsync;

app.keys = ['secret-key-blah'];
app.use(session({}, app));
app.use(bodyParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(convert(compress()));
app.use(convert(logger()));

// Check maintenance
app.use(mw.maintenaceMiddleware);

app.use(mw.authMiddleware);

app.use(async (ctx: Context, next) => {
  await next();
  if (ctx.fresh) {
    ctx.status = 304;
  }
});
app.use(etag());
app.use(mw.objectFormatMiddleware);
app.use(rootRouter.routes());
app.use(mount('/js', serve(__dirname + '/../frontend/js', {
  maxage: 2628000000,
})));
app.use(serve(__dirname + '/../frontend'));
// app.use(mw.redirectToRootMiddleware);



app.start = async (port?: number) => {
  if (!port) {
    port = await getPort({port: config.PORT});
  }
  // Finally - socket.io
  const server = new Server(app.callback());
  const io = sio(server);
  server.listen(port, () => {
    console.log('Listening on port', port);
  });

  mw.maintenaceMiddleware.disable();
};
