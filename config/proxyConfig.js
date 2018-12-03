module.exports = {
    proxy: {
        '/baidu-api': {
            target: 'http://api.map.baidu.com',
            changeOrigin: true,
            pathRewrite: {
                '^/baidu-api': ''
            }
        }
    }
}