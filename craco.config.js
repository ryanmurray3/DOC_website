const CracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: "./src",
        tsConfigPath: "./tsconfig.paths.json",
      },
    },
  ],
};
// This configuration file sets up path aliases for the project using Craco.
// It allows for cleaner imports by defining custom paths in the tsconfig.paths.json file.