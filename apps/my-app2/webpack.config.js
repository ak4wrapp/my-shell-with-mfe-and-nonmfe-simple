const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx", // Your entry point for React app
  mode: "development",
  devServer: {
    static: path.join(__dirname, "dist"), // Serve from the 'dist' directory
    port: 3003, // Port for the app
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Single bundled file for your app
    publicPath: "auto", // Ensure correct pathing in dev mode
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // Resolve TypeScript and JS
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader", // Compile TypeScript
        exclude: /node_modules/,
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // Automatically inject the bundle.js into index.html
    new HtmlWebpackPlugin({
      template: "./public/index.html", // Path to your HTML template
    }),
  ],
};
