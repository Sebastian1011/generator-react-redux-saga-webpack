module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        node: true
    },
    extends: ["eslint:recommended", "plugin:react/recommended"],
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true
        },
        sourceType: "module"
    },
    globals: {
        "__filenamespace": true
    },
    plugins: [
        "react",
        "redux-saga"
    ],
    rules:{
        "react/prop-types":[0],
        "no-unused-vars": [1]
    }
};
