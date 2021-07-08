(function (moduleOne) {
    'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var moduleOne__default = /*#__PURE__*/_interopDefaultLegacy(moduleOne);

    (function () {

        const modules = new Map();

        const yxRequire = (moduleId, callback) => {
            if (modules.has(moduleId)) {
                callback(modules.get(moduleId));
            } else {    
                fetch(`/module/${moduleId}`).then(async (data) => {
                    const res = await data.json();
                    if (res.code === 0) {
                        loadScript(src).then(() => {
                            callback(modules.get(moduleId));
                        });
                    } else {
                        console.error(res.msg);
                    }
                });
            }
        };


        function loadScript(src) {
            const script = document.createElement('script');
            return new Promise((resolve, reject) => {
                script.onload = () => {
                    resolve();
                };
                script.onerror = () => {
                    reject();
                };
                script.src = src;
            });
        }

        window.yxRequire = yxRequire;

        yxRequire.modules = modules;

    }());

    moduleOne__default['default'].run();

}(moduleOne));
