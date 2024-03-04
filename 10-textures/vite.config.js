export default {
	root: 'src/',
	publicDir: '../static/',
	base: './',
	server: {
		host: true,
		port: 3000
	},
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		sourcemap: true
	},
}