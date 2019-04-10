var httpProxy = require('http-proxy')

httpProxy
	.createProxyServer({
		target: 'https://api.paradice.in/',
		secure: false,
		changeOrigin: true,
		ws: true,
	})
	.on('proxyRes', function(proxyRes, req, res) {
		proxyRes.headers['access-control-allow-origin'] = '*'
	})
	.listen(8000)
