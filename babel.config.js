
const mode = process.env.NODE_ENV;

module.exports = {
    presets: [
        ['@babel/preset-env', {
            targets: mode === 'test' ? { node: 'current' } : 'defaults',
        }],
    ],
};
