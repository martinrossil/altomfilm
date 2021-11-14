function resolveBundle() {
    let ecmaVersion = 2015;
    var bundleScript = document.createElement('script');
    
    if (typeof Object.fromEntries === 'function') {
        ecmaVersion = 2019;
    } else if (window.Promise !== undefined && typeof window.Promise.prototype.finally === 'function' ) {
        ecmaVersion = 2018;
    } else if (typeof String.prototype.padStart === 'function') {
        ecmaVersion = 2017;
    } else if (typeof Array.prototype.includes === 'function') {
        ecmaVersion = 2016;
    } else if(window.Promise !== undefined) {
        ecmaVersion = 2015;
    } else {
        console.log('Unsupported');
        return;
    }
    bundleScript.type = 'module';
    bundleScript.src = 'AltOmFilm.' + ecmaVersion + '.js';
    document.body.appendChild(bundleScript);
}

resolveBundle();