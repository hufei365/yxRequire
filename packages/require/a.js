define("./a.js", function(module, _export){
    console.log('start excute mod a.js');

    _export.done = false;
    const b = require('./b.js', function(b){
        
        console.log(`in a.js and b.done: ${b.done}`);
        
        module.exports.done = true;
        console.log('end excute mod a.js')
            
    })
});

