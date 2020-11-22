// 实现这个项目的构建任务

const del = require('del')
const browserSync = require('browser-sync')
const {Transform} = require('stream')
const { src, dest, parallel, series, watch  } = require('gulp')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()

const bs = browserSync.create()

const cwd =  process.cwd()
let port = 8000
let  autoOpen = false
console.log(process.argv)
function mergeOptions(source,target) {
    for (let key in target) {
        if (source[key] && typeof source[key] === 'object') {
            mergeOptions(source[key], target[key])
        } else {
            source[key] = target[key]
        }
    }
}

function getEnv() {
    const arr = process.argv.slice(2)
    const index = arr.findIndex(item => item === '--port')
     port = arr[index + 1] || port
     autoOpen = arr.includes('--open')
}
getEnv()
let config = {
    build: {
        src:'src',
        dist: 'dist',
        temp: 'temp',
        public: 'public',
        paths: {
            style: 'assets/styles/**/*.scss',
            scripts: 'assets/scripts/**/*.js',
            images:  'assets/images/**',
            fonts: 'assets/fonts/**',
            html: '**/*.html'
        }
    }
}

try {
    const loadConfig = require(`${cwd}/pages.config.js`)
    mergeOptions(config,  loadConfig)
}catch {

}
const style = () => {
    return src(config.build.paths.style, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.sass({
        outputStyle: 'expanded'
    }))
    .pipe(dest(config.build.temp))
    // .pipe(bs.reload())
}

const script = () => {
    return src(config.build.paths.scripts, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.babel({
        presets: [require('@babel/preset-env')]
    }))
    .pipe(dest(config.build.temp))
}

const page =  () => {
    return src(config.build.paths.html, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.swig({
        data: config.data,
        defaults: {
            cache: false
        }
    }))
    .pipe(dest(config.build.temp))
    .pipe(bs.reload({stream: true}))
}

const image = () => {
    return src(config.build.paths.images, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.temp))
}

const font = () => {
    return src(config.build.paths.fonts, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.imagemin())
    .pipe(dest(config.build.temp))
}

const extra = () => {
    return src('**', {base: config.build.public, cwd: config.build.public})
    .pipe(dest(config.build.temp))
}
const clean = () => {
    return del([config.build.dist, config.build.temp])
}

const serve = () => {
    watch(config.build.paths.style, {cwd: config.build.src},  style)
    watch(config.build.paths.scripts, { cwd: config.build.src }, script)
    watch(config.build.paths.html, {cwd: config.build.src}, page)
    // watch('src/assets/images/**', image)
    // watch('src/assets/fonts/**', font)
    // watch('public/**', extra)
    watch([config.build.paths.images, config.build.paths.fonts], {cwd: config.build.src}, bs.reload)
    watch('**', {cwd: config.build.public}, bs.reload)
    bs.init({
        notify: false,
        port: port,
        open: autoOpen,
        files: config.build.temp,
        server: {
            baseDir: [config.build.temp, config.build.src, config.build.public],
            routes: {
                '/node_modules': 'node_modules'
            }
        }
    })
}

const useref = () => {
    return src(config.build.paths.html, {base: config.build.temp, cwd: config.build.temp})
    .pipe(plugins.useref({
        searchPath: [config.build.temp, '.']
    }))
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace:  true,
        minifyCss: true,
        minifyJs: true
    })))
    .pipe(dest(config.build.dist))
}


function transform(transform, flush) {
	if (typeof flush === 'function') {
		return new Transform({
			objectMode: true,
			transform,
			flush
		});
	}

	return new Transform({
		objectMode: true,
		transform
	});
};
const lintJs = () => {
    return src('src/assets/scripts/main.js', {base: 'src'})
    .pipe(plugins.eslint({
        rules:  {
            'no-alert': 0,
				'no-bitwise': 0,
				'camelcase': 1,
				'curly': 1,
				'eqeqeq': 0,
				'no-eq-null': 0,
				'guard-for-in': 1,
				'no-empty': 1,
				'no-use-before-define': 0,
				'no-obj-calls': 2,
				'no-unused-vars': 0,
				'new-cap': 1,
				'no-shadow': 0,
				'no-invalid-regexp': 2,
				'comma-dangle': 2,
				'no-undef': 1,
				'no-new': 1,
				'no-extra-semi': 1,
				'no-debugger': 2,
				'no-caller': 1,
				'semi': 0,
				'quotes': 0,
				'no-unreachable': 2
        },
        envs: ['es6'],
        globals:['$']
    }))
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError())
}

const lintScss = () => {
    return src(config.build.paths.style, {base: config.build.src, cwd: config.build.src})
    .pipe(plugins.scssLint())
    .pipe(dest(config.build.paths.style, {base: config.build.src, cwd: config.build.src}))
}

const lint = parallel(lintJs, lintScss)
const compile = parallel(style, script, page)
const build = series(clean, parallel(series(compile, useref), image, font, extra))
const develop = series(compile, serve)
module.exports = {
    clean,
    compile,
    build,
    serve: develop,
    lint
}
