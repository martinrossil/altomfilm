import clear from 'rollup-plugin-clear';
import resolve from '@rollup/plugin-node-resolve';
import copy from 'rollup-plugin-copy';
import compiler from '@ampproject/rollup-plugin-closure-compiler';
import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import strip from '@rollup/plugin-strip';
import html from '@rollup/plugin-html';
export default [{
    input: ['./src/AltOmFilm.ts',
            './src/Module1.ts',
            './src/Module2.ts'],
    onwarn: function(warning, warn) {
        return;
    },
    plugins: [
        clear({ targets: ['public'] }),
        resolve(),
        copy({
            targets: [
                { src: 'assets/fonts/**.*', dest: 'public' },
                { src: 'assets/icons/**.*', dest: 'public' },
                { src: 'assets/production/**.*', dest: 'public', },
            ]
        }),
        typescript(),
        strip({ include: '**/*.ts' }),
        html({template: template}),
        filesize({ showBrotliSize: true })
    ],
    output: [getOutput(2019), getOutput(2018), getOutput(2017), getOutput(2016), getOutput(2015)]
}, {
    input: './src/AltOmFilm.ts',
    onwarn: function(warning, warn) {
        return;
    },
    plugins: [
        resolve(),
        typescript(),
        strip({ include: '**/*.ts' }),
        html({template: template}),
        filesize({ showBrotliSize: true })
    ],
    output: getES5()
}];

function getOutput(year) {
    const output = {
        entryFileNames: '[name].' + year + '.[hash].js',
        dir: './public/',
        format: 'esm',
        plugins: [getCompiler(year)]
    }
    return output;
}

function getCompiler(year) {
    const ecma = 'ECMASCRIPT_' + year;
    return compiler({ language_in: 'ECMASCRIPT_NEXT', compilation_level: 'ADVANCED', language_out: ecma })
}

function getES5() {
    return {
        entryFileNames: '[name].es5.[hash].js',
        dir: './public/',
        inlineDynamicImports: true,
        format: 'iife',
        plugins: [
            compiler({
                language_in: 'ECMASCRIPT_NEXT',
                compilation_level: 'ADVANCED',
                language_out: 'ECMASCRIPT5'
            })
        ]
    }
}
let entryChunkES5;
let entryChunk2015;
let entryChunk2016;
let entryChunk2017;
let entryChunk2018;
let entryChunk2019;

function template({files}) {
    const chunks = files.js;
    for (const chunk of chunks) {
        console.log(chunk.fileName);
        if (chunk.isEntry) {
            let fileName = chunk.fileName;
            if (fileName.startsWith('AltOmFilm.es5')) {
                entryChunkES5 = fileName;
            } else if (fileName.startsWith('AltOmFilm.2015')) {
                entryChunk2015 = fileName;
            } else if (fileName.startsWith('AltOmFilm.2016')) {
                entryChunk2016 = fileName;
            } else if (fileName.startsWith('AltOmFilm.2017')) {
                entryChunk2017 = fileName;
            } else if (fileName.startsWith('AltOmFilm.2018')) {
                entryChunk2018 = fileName;
            } else if (fileName.startsWith('AltOmFilm.2019')) {
                entryChunk2019 = fileName;
            }
        }
    }
    return `<!DOCTYPE html>
<html lang="da">
  <head>
    <base href="/">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">
    <meta name="Description" content="Alt om film, Danmarks største film database.">
    <meta name="theme-color" content="#ffffff">
    <link rel="icon" href="icon32x32.ico">
    <link rel="icon" href="icon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="icon180x180.png">
    <link rel="manifest" href="manifest.webmanifest">
    <title>Alt om film, Danmarks største film database.</title>
  </head>
  <body>
    <alt-om-film></alt-om-film>
    <script>
    function testCustomElements() {
        if (!window.customElements) {
            loadCustomElements();
        } else {
            testFetch();
        }
    }
    function loadCustomElements() {
        var ce = document.createElement('script');
        ce.src = './ce.js';
        ce.onload = testFetch;
        document.body.appendChild(ce);
    }
    function testFetch() {
        if (!window.fetch) {
            loadFetch();
        } else {
            resolveBundle();
        }
    }
    function loadFetch() {
        var fe = document.createElement('script');
        fe.src = './fetch.js';
        fe.onload = resolveBundle;
        document.body.appendChild(fe);
    }
    function resolveBundle() {
        var bundleScript = document.createElement('script');
        bundleScript.type = 'module';
        var src;
        if (typeof Object.fromEntries === 'function') {
            src = '` + entryChunk2019 + `';
        } else if (window.Promise !== undefined && typeof window.Promise.prototype.finally === 'function' ) {
            src = '` + entryChunk2018 + `';
        } else if (typeof String.prototype.padStart === 'function') {
            src = '` + entryChunk2017 + `';
        } else if (typeof Array.prototype.includes === 'function') {
            src = '` + entryChunk2016 + `';
        } else if(window.Promise !== undefined) {
            src = '` + entryChunk2015 + `';
        } else {
            src = '` + entryChunkES5 + `';
            bundleScript.type = '';
        }
        bundleScript.src = src;
        document.body.appendChild(bundleScript);
    }
    if (typeof window.CustomEvent !== 'function') {
        function CustomEvent (event, params) {
            params = params || { bubbles: false, cancelable: false, detail: undefined };
            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        }
        CustomEvent.prototype = window.Event.prototype;
        window.CustomEvent = CustomEvent;
    }
    testCustomElements();
    </script>
  </body>
</html>`
}