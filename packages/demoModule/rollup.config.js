// rollup.config.js

import yxRequire from './lib/rollup-plugin-yxrequire';

export default {
    // 核心选项
    input: 'lib/demoModule.js',     // 必须

    output: {  // 必须 (如果要输出多个，可以是一个数组)
        // 核心选项
        file: 'dist/demoModule.js',    // 必须
        format: 'iife',  // 必须
        name: 'demoApp'
    },
    plugins: [ yxRequire()]
};