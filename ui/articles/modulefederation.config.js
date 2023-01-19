const deps = require("./package.json").dependencies;

module.exports = {
  name: "articles",
  remotes: {
    container: "container@http://localhost:3000/remoteEntry.js",
  },
  filename: "remoteEntry.js",
  shared: {
    ...deps,
    react: {
      singleton: true,
      requiredVersion: deps["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: deps["react-dom"],
    },
  },
};
