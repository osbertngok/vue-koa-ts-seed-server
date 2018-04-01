export const NODE_ENV = process.env.NODE_ENV || 'development';
export const INTERNAL_PORT = (process.env.INTERNAL_PORT !== undefined ? parseInt(process.env.PORT as string,
  10) : 0) || 4001;
export const PORT = (process.env.PORT !== undefined ? parseInt(process.env.PORT as string, 10) : 0) || 4000;
