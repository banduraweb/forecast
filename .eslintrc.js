module.exports = {
    extends: [
        "plugin:react/recommended",
        'plugin:prettier/recommended',
    ],
    plugins: ['react-hooks', 'react'],
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        'no-console': 'error',
        'react/prop-types': 1,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',

    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
