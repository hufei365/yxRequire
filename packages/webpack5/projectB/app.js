const Common = import('Common/C');

Common.then(m => {
    console.log(m.default, m.default.name, 'load module fedration Common');
    
})

const D = 1;
console.log(D);