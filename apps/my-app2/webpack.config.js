const path = require('path');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  
  plugins: [
    new ModuleFederationPlugin({
      name: 'my-app2',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App'
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    })
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    port: 3003
  }
};
