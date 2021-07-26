
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/vue-component-store.js',
        format: 'umd',
        name: 'VueComponentStore',
    },
    plugins: [babel({ babelHelpers: 'inline' })],
};
