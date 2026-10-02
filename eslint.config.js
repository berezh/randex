const { defineConfig, globalIgnores } = require("eslint/config");
const configs = require("eslint-config-varp");

module.exports = defineConfig([
  {
    extends: [configs.eslint.base, configs.eslint.typescript],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "prefer-destructuring": "off",
      "sonarjs/cognitive-complexity": ["error", 30],
    },
  },
  // {
  //   files: ["src/**/*"],
  //   rules: {
  //     "check-file/filename-naming-convention": [
  //       "error",
  //       {
  //         "**/*.{ts,tsx}": "CAMEL_CASE",
  //       },
  //       {
  //         ignoreMiddleExtensions: true,
  //       },
  //     ],
  //     "check-file/folder-naming-convention": ["error", { "src/**/": "CAMEL_CASE" }],
  //   },
  // },
  globalIgnores(["lib", "node_modules"]),
]);
