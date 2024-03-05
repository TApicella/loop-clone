// rollup.config.js
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import html from '@rollup/plugin-html';
import replace from '@rollup/plugin-replace';

// PostCSS plugins
import postcss from 'rollup-plugin-postcss';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';

export default {
	input: 'src/index.tsx',
	output: {
		file: 'dist/index.js',
		format: 'es'
	},
	plugins: [
		replace({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
			preventAssignment: true
		}),
		postcss({
			plugins: [
				simplevars(),
				nested(),
				cssnext({ warnForDuplicates: false, }),
			],
			extensions: ['.css'],
			extract: true,
		}),
		typescript(),
		resolve(),
		commonjs(),
		html(),
	]
};
