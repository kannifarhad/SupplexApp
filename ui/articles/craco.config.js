const CracoLessPlugin = require('craco-less')
const FederationSettings = require("./craco-plugins/module-federation")

module.exports = {
    plugins: [
        {
            plugin: FederationSettings
        },
        {
            plugin: CracoLessPlugin,
            options: {
            lessLoaderOptions: {
                lessOptions: {
                javascriptEnabled: true,
                modifyVars: {
                    '@primary-color': '#3C4BC5',
                    '@error-color': '#ff4d4f',
                    '@border-radius-base': '4px',
                },
                },
            },
            },
        },
        {   
            plugin: require("craco-alias"),
            options: {
                source: "tsconfig",
                // baseUrl SHOULD be specified
                // plugin does not take it from tsconfig
                baseUrl: ".",
                // tsConfigPath should point to the file where "baseUrl" and "paths" are specified
                tsConfigPath: "./tsconfig.paths.json"
            }
        }
    ]
};
