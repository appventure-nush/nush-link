module.exports = {
  lintOnSave: false,
  transpileDependencies: [
    "vuetify",
  ],
  chainWebpack: (config) => {
    config.module
      .rule("ts")
      .use("ts-loader")
      .loader("ts-loader");
  },
  devServer: {
    proxy: "http://localhost:5000"
  }
};
