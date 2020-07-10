import { terser } from "rollup-plugin-terser";
import resolve from '@rollup/plugin-node-resolve';

const pkg = require('./package.json');

const isTest = process.env.NODE_ENV === 'test';

export default !isTest ?
[

    {
        input: 'src/index.js',
        output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' }
        ],
        external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ],
        plugins: [terser()]
    },
    {
        input: 'src/index.js',
        output:{ 
            file: pkg.browser, 
            name: 'storik',
            format: 'umd' 
        },
        external: false,
        plugins: [resolve({ browser: true }),terser({ module: true})]
    }

] : [

    {
        input: 'src/index.js',
        output: {
            file: 'test/storik.js', 
            format: 'cjs' 
        },
        external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.peerDependencies || {}),
        ]
    }

]