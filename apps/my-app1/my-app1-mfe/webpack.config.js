const path = require("path");
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
  entry: "./src/index.tsx", // Entry point for your MFE app
  mode: "development", // Set mode to development (or 'production' if you're building for production)
  devServer: {
    port: 3001, // Port where MFE will be running
    open: true, // Automatically open the browser when the server starts
    // Add Cors headers to allow the container to access the MFE
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".json"], // Resolve file extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/, // Use ts-loader for TypeScript files
        exclude: /node_modules/,
        use: "ts-loader",
      },
      {
        test: /\.css$/, // For handling CSS files
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "auto", // Ensure publicPath is auto to handle dynamic imports correctly
    library: {
      name: "my_app1_mfe", // Name of the MFE app for Module Federation
      type: "var", // The module type, 'var' ensures compatibility
    },
    clean: true, // Clean the output folder before every build
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "my_app1_mfe",
      filename: "remoteEntry.js", // Name of the file exposed for remote entry
      exposes: {
        "./App": "./src/App", // Expose the App component so it can be used in the container
      },
      shared: {
        react: { singleton: true, eager: true }, // React should be singleton across both apps
        "react-dom": { singleton: true, eager: true }, // ReactDOM should be singleton across both apps
      },
    }),
  ],
};
