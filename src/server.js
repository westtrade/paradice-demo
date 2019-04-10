const express = require('express')
const expressStaticGzip = require('express-static-gzip')
const app = express()
// const proxy = require('./proxy')
const path = require('path')
const proxy = require('http-proxy-middleware')

const http = require('http')

app.use('/', expressStaticGzip(path.resolve(__dirname, '../dist')))
// app.use('/api', (req, res) => proxy.web(req, res))
app.use(
	'/api',
	proxy({
		target: 'https://api.paradice.in/',
		secure: false,
		changeOrigin: true,
		ws: true,
		pathRewrite: {
			'^/api': '/', // rewrite path
		},
		onProxyRes: (proxyRes, req, res) => {
			proxyRes.headers['access-control-allow-origin'] = '*'
		},
	}),
)

const server = http.createServer(app)

// server.on('upgrade', function(req, socket, head) {
// 	proxy.ws(req, socket, head)
// })

server.listen(8080)
