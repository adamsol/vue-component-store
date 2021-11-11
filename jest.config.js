
module.exports = {
    moduleFileExtensions: ['js', 'vue'],
    testEnvironment: 'jsdom',
    testMatch: ['**/test/**/*.test.js'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
    },
};
