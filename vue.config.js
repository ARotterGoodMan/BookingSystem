const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "http://1.12.246.2:5000/",
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": "",
                    },
                },
            },
        },
    },

})
