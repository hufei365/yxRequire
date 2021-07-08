'use strict';

const Koa = require('koa2');

const app = new Koa();

const registry = Object.create(null);
registry.moduleOne = true;

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});

app.use(async ctx => {
    const { path = '' } = ctx;
    const moduleId = path.split('/')[2];
    if (moduleId && registry[moduleId]) {
        ctx.body = JSON.stringify({
            code: 0,
            msg: 'success',
            data: 'http://localhost:8080/moduleOne.js'
        })
    } else {
        ctx.body = JSON.stringify({
            code: -1,
            msg: `Can not find the module: ${moduleId}\nPlease check module name`,
            data: null
        })
        
    }
});

app.listen(3000);