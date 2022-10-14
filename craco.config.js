const cracoAlias = require("craco-alias");

module.exports = {
  plugins: [
    {
      plugin: cracoAlias,
      options: {
        unsafeAllowModulesOutsideOfSrc: true,
        source: "tsconfig",
        tsConfigPath: "./tsconfig.json",
      }
    }
  ]
};