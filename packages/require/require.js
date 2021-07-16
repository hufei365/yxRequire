const modules = Object.create(null);
const loading = new Map();
const loaded = new Map();

const require = (id, callback) => {
    let mod = modules[id];
    console.log(modules);
    if (!mod && !loading.has(id)) {
        loading.set(id, true);
        loadScript(id, callback);
    } else {
        callback(mod.exports);
    }
}

const define = (id, callback) => {
    const module = modules[id] = Object.create(null);
    const _export = module.exports = Object.create(null);
    callback(module, _export);
}


const loadScript = function (id, callback) {
    const script = document.createElement('script');
    script.src = id;
    loading.set(id, true);


    script.onload = () => {
        loading.delete(id);
        loaded.set(id, true)
        callback(modules[id].exports);
    }

    document.body.appendChild(script);
};