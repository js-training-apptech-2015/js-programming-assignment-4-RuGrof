var LoadedModules = {}; //global object for loaded modules

function define(modules, callback) {
    Promise.all(modules.map(function (name) {
        return new Promise(function (resolve, reject) {
            var scriptElement;
            scriptElement = document.createElement('script');
            scriptElement.src = name;
            scriptElement.setAttribute('data-name', name);
            LoadedModules[name] = resolve;
            document.body.appendChild(scriptElement);
        });
    })).then(function (modules) {
        var exported;
        var moduleName;
        exported = callback.apply(null, modules);
        moduleName = document.currentScript.dataset.name;
        if (LoadedModules[moduleName]) {
            LoadedModules[moduleName](exported);
        }
    });
};
