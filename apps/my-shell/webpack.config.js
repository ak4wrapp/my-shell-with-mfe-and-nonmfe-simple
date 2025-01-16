const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx", // Entry point for the standalone app
  mode: "development", // Set mode to development
  devServer: {
    port: 3000, // Port for the standalone app
    open: true, // Automatically open the browser when the server starts
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Use ts-loader for TypeScript files
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/, // Handle CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto", // Ensure the public path is auto for dynamic loading
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "my_shell",
      remotes: {
        my_app1_mfe: "my_app1_mfe@http://localhost:3001/remoteEntry.js", // Reference MFE app
      },
      shared: {
        react: { singleton: true, eager: true }, // React should be singleton
        "react-dom": { singleton: true, eager: true }, // ReactDOM should be singleton
      },
    }),
  ],
};
