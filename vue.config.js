const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "",
                    changeOrigin: true,
                    pathRewrite: {
                        "^/api": "",
                    },
                },
            },
        },
    },

})
