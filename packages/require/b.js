

define("./b.js", function(module, _export){
    console.log('start excute mod b.js')

    const stack = new Error();
    console.log(stack);
    _export.done = false;
    const a = require('./a.js', function(a){

        console.log(`in b.js and a.done: ${a.done}`);

        
        module.exports.done = true;
        console.log('end excute mod b.js')
    });

});