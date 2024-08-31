module.exports = {
    apps: [{
        name: 'trAIn-server',
        script: './dist/server.js',
        env_production: {
            NODE_ENV: 'production',
        }
    }]
}