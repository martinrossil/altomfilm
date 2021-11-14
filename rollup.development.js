import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import livereload from 'rollup-plugin-livereload';

export default [{
        input: ['./src/AltOmFilm.ts',
                './src/Module1.ts',
                './src/Module2.ts'],
        plugins: [
            typescript({ tsconfig: 'tsconfig.development.json' }),
            resolve(),
            livereload({
                watch: 'development'
            })
        ],
        output: {
            entryFileNames: '[name].esnext.js',
            dir: './development',
            format: 'esm',
            sourcemap: 'inline'
        }
    }
]
