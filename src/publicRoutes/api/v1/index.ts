import * as Router from 'koa-router';


import {userRouter} from './user';
import {utilsRouter} from './utils';


export const v1Router = new Router();

v1Router.use('/user', userRouter.routes());
v1Router.use('/utils', utilsRouter.routes());
