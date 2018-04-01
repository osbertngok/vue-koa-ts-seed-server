import * as KoaPassport from 'koa-passport';

import { Strategy as LocalStrategy } from 'passport-local';

const singleUser = {
  username: 'admin',
  password: '123456',
};

KoaPassport.serializeUser((user, done) => {
  done(null, user);
});

KoaPassport.deserializeUser((user, done) => {
  done(null, user);
});

KoaPassport.use(new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
}, (username: string, password: string, done: any) => {
  console.log(`username: ${username}`);
  if (username !== singleUser.username) {
    return done(new Error(`user ${username} doesn't exist`));
  }
  if (password !== singleUser.password) {
    return done(new Error(`password is not correct`));
  }
  return done(null, {
    username,
  });
}));
