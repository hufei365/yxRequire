'use strict';

const Koa = require('koa2');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();


const registry = Object.create(null);
registry.moduleOne = true;

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
});


router.get('/module/:id', (ctx, next) => {
    const { id: moduleId }= ctx.params;
    if (hasModule(moduleId)) {
        ctx.body = JSON.stringify({
            code: 0,
            msg: 'success',
            data: 'http://localhost:8080/moduleOne.js'
        })
    } else {
        canNotFindModule(ctx, next);
    }
}).get('/module/source/:id', async (ctx, next) => {
    const { id: moduleId }= ctx.params;
    if (hasModule(moduleId)) {
        ctx.body = await readSourceCodeFromRemote();
    } else {
        canNotFindModule(ctx, next);
    }
})

app.use(router.routes());

console.log(typeof app.listen(3000, function(){
    console.info('Server has started at port: 3000\nYou can visit http://localhost:3000');
}));


/*** utils ****/

function canNotFindModule (ctx, next){
    ctx.body = JSON.stringify({
        code: -1,
        msg: `Can not find the module: ${moduleId}\nPlease check module name`,
        data: null
    })
}


function readSourceCodeFromRemote (ctx, next){
    return `export default {
        name: 'test remote module',
        content: 'haha'
    }`
}

function hasModule (moduleId) {
    return true;
}