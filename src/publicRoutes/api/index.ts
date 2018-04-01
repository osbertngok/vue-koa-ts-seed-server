import * as Router from 'koa-router';
import {v1Router} from './v1';
export const apiRouter = new Router();

apiRouter.use('/v1', v1Router.routes());
