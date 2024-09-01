module.exports = {
    apps: [{
      name: "trAIn-prompt",
      script: "./dist/server.js",
      env_production: {
        NODE_ENV: "production"
      }
    }]
  }
  