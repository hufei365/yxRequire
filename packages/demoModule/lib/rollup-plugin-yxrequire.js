// rollup-plugin-my-example.js
export default function yxRequire() {
    return {
        name: 'my-example', // this name will show up in warnings and errors
        resolveId(source) {
            if (/^common:[a-z]/i.test(source)) {
                return source; // this signals that rollup should not ask other plugins or check the file system to find this id
            }
            return null; // other ids should be handled as usually
        },
        load(id) {
            if (/^common:[a-z]/i.test(id)) {
                return `export default 1;`
                // return getSourceCodeFromRemote(id); // this signals that rollup should not ask other plugins or check the file system to find this id
            }
            return null; // other ids should be handled as usually
        }
    };
}


const API = '/module/source';

function getSourceCodeFromRemote(moduleId) {
    return fetch(`${API}/${moduleId}`);
}

const http = require('http')


function fetch(path) {
    const options = {
        hostname: 'localhost',
        port: 3000,
        path,
        method: 'GET'
    }

    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            console.log(`statusCode: ${res.statusCode}`)

            res.on('data', d => {
                process.stdout.write(d)
            })

            res.on('end', d => {
                resolve(d);
            })
        })

        req.on('error', error => {
            reject(error)
        })

        req.end();
    })

}