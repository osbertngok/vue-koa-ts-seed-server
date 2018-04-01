declare module 'koa-convert' {

    import * as Koa from 'koa';

    /**
     * Convert middleware for Koa
     */
    function convert(middleware: Koa.Middleware): Koa.Middleware;

    namespace convert {}
    export = convert;
}

declare module 'koa-etag' {

    import * as Koa from 'koa';

    /**
     * Etag middleware for Koa
     */
    function etag(): Koa.Middleware;

    namespace etag {}
    export = etag;
}
