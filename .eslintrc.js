const { Module } = require("@hotwired/stimulus/dist/types/core/module");

//./.eslintrc.js
module.exports = {
    root: true,
    extends: ['airbnb', 'airbnb/hooks'],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'react/function-component-definition': [
            1,
            { nameComponents: 'arrow-function' },
        ],
        'no-console': 0,
        'no-aleert': 0,
    }
}