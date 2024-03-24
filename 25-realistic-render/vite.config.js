export default {
	root: 'src/',
	publicDir: '../static/',
	base: './',
	server: {
		port: 3000,
		host: true
	},
	build: {
		outDir: '../dist',
		emptyOutDir: true,
		sourcemap: true
	}
}