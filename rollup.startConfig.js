// rollup.startConfig.js
import serve from 'rollup-plugin-serve';
import buildConfig from './rollup.config.js';

buildConfig.plugins.push(serve({contentBase: ['dist'], port: 3000}));

export default buildConfig;
