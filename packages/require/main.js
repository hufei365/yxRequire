


define('main', function(module, _export){
    console.log('main');
    const a = require('./a.js', function(a){
        console.log(`in main.js and a.done:${a.done}`);
        const b = require('./b.js', function(b){
            console.log(`in main.js and b.done:${b.done}`);

            console.log('end main')
        });
    });
})