// rollup.config.js
export default {
    // 核心选项
    input: 'lib/client.js',     // 必须
  
    output: {  // 必须 (如果要输出多个，可以是一个数组)
      // 核心选项
      file: 'dist/yxRequire.js',    // 必须
      format: 'iife',  // 必须
      name: 'yxRequire'
    },
  };