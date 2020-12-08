const WorkerPlugin = require("worker-plugin");

module.exports = {
    poweredByHeader: false,
    // exportTrailingSlash: true,
    devIndicators: {
        autoPrerender: false,
    },
    plugins: [
        new WorkerPlugin({
            globalObject: "self",
        }),
    ],
};
