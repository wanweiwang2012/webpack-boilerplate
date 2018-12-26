module.exports = {
  root: true,
  extends: ["standard", "plugin:prettier/recommended"],
  plugins: [],
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      impliedStrict: true,
      jsx: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    // _: true,
    ENV_CONFIG: true,
  },
  settings: {},
  rules: {},
};
