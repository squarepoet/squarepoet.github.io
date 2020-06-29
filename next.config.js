module.exports = {
    poweredByHeader: false,
    // exportTrailingSlash: true,
    devIndicators: {
        autoPrerender: false,
    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.worker\.(js|ts)$/,
            loader: "worker-loader",
            options: {
                name: "static/[hash].worker.js",
                publicPath: "/_next/",
            },
        });

        // Overcome webpack referencing `window` in chunks
        config.output.globalObject = "self";
        return config;
    },
};
