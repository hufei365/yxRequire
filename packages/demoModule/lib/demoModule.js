'use strict';

yxDefine('moduleOne', ['moduleTwo'], function(moduleTwo){
    let count = 0;
    return {
        name: 'moduleOne',
        run(){
            console.log(`this has been called ${++count} times...`)
        }
    }
})