'use strict';

import  a from "./rollup-plugin-yxrequire.js";

import  b from 'common:two';
console.log(b);
console.log(a);

let count = 0;
export default {
    name: 'moduleOne',
    run() {
        console.log(`this has been called ${++count} times...`)
    }
}