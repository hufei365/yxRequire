'use strict';

const API = 'http://localhost:3000/module'
const modules = new Map();

const yxRequire = (moduleIds, callback) => {
    if (!Array.isArray(moduleIds)) {
        moduleIds = [moduleIds];
    }
    const allModules = moduleIds.map((moduleId) => {
        return _yxRequire(moduleId);
    });
    return Promise.all(allModules).then((args) => {
        return callback.apply(null, args);
    }, (error) => {
        console.error(error);
    });
}

const _yxRequire = (moduleId) => {
    return new Promise((resolve, reject) => {
        if (modules.has(moduleId)) {
            resolve(modules.get(moduleId))
        } else {
            fetch(`${API}/${moduleId}`).then(async (data) => {
                const res = await data.json();
                if (res.code === 0) {
                    loadScript(src).then(() => {
                        resolve(modules.get(moduleId));
                    })
                } else {
                    reject(res.msg);
                }
            });
        }
    });
}


function loadScript(src) {
    const script = document.createElement('script');
    return new Promise((resolve, reject) => {
        script.onload = () => {
            resolve()
        }
        script.onerror = (err) => {
            reject(err);
        }
        script.src = src;
    });
}

const yxDefine =  async (id, deps, moduleInit) => {
    if (Array.isArray(deps) && deps.length > 0) {
        const module = await yxRequire(deps, moduleInit);
        if (module) {
            modules.set(id, module);
        }
    } else {
        modules.set(id, moduleInit());
    }
}

window.yxRequire = yxRequire;

yxRequire.modules = modules;