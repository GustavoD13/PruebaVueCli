module.exports = {
    devServer: {
      proxy: process.env.baseURL || "http://localhost:3000"
    }
  }