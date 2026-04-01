const fs = require("fs");

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/styles/sass/_variables.scss";`,
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'resources/src')
      }
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.done.tap("WriteVersionFilePlugin", () => {
            const version = new Date().toISOString();
            fs.writeFileSync(
              "./dist/version.json",
              JSON.stringify({ version })
            );
          });
        },
      },
    ],
  },
};