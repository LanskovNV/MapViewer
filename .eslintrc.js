module.exports = {
    "parser": "babel-eslint",
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true
    },
    'extends': ['eslint:recommended', "plugin:react/recommended"],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly',
        "shallow": true
    },
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    'plugins': ['react'],
    "rules": {
        "indent": ["error", 2, {"SwitchCase": 1}],
        "no-console": "off",
        "no-plusplus": "off",
        "no-continue": "off",
        "max-len": [1, 200, 2, {ignoreComments: true}],
        "lines-between-class-members": ["error", "never"]
    },
    "settings": {
        "react": {
            "createClass": "createReactClass",
            "pragma": "React",
            "version": "detect",
            "flowVersion": "0.53"
        },
        "propWrapperFunctions": [
            // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
            "forbidExtraProps",
            {"property": "freeze", "object": "Object"},
            {"property": "myFavoriteWrapper"}
        ],
        "linkComponents": [
            // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
            "Hyperlink",
            {"name": "Link", "linkAttribute": "to"}
        ]
    }
};
