#!/bin/bash

# Exit on error
set -e

# Function to create React MFE project
create_mfe_app() {
  echo "Creating my-app1-mfe..."
  npx create-react-app my-app1-mfe --template typescript

  cd my-app1-mfe

  # Install necessary dependencies
  npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader @types/react @types/react-dom
  npm install react react-dom

  # Create webpack.config.js
  cat > webpack.config.js <<EOL
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3001,
    open: true,
    setupMiddlewares: (middlewares, devServer) => {
      devServer.app.get('/', (req, res) => {
        res.redirect('/remoteEntry.js');
      });
      return middlewares;
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
    library: {
      name: 'my_app1_mfe',
      type: 'var',
    },
    clean: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'my_app1_mfe',
      filename: 'remoteEntry.js',
      exposes: {
        './App': './src/App',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ],
};
EOL

  # Create App.tsx for MFE
  cat > src/App.tsx <<EOL
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>My MFE App</h1>
    </div>
  );
};

export default App;
EOL

  # Create index.tsx for MFE
  cat > src/index.tsx <<EOL
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

  echo "my-app1-mfe setup complete."
}

# Function to create Standalone app
create_standalone_app() {
  echo "Creating my-app1-standalone..."
  npx create-react-app my-app1-standalone --template typescript

  cd my-app1-standalone

  # Install necessary dependencies
  npm install --save-dev webpack webpack-cli webpack-dev-server ts-loader @types/react @types/react-dom
  npm install react react-dom

  # Create webpack.config.js
  cat > webpack.config.js <<EOL
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'auto',
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'my_app1_standalone',
      remotes: {
        my_app1_mfe: 'my_app1_mfe@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
      },
    }),
  ],
};
EOL

  # Create App.tsx for Standalone
  cat > src/App.tsx <<EOL
import React from 'react';

const App = () => {
  return (
    <div>
      <h1>My Standalone App with MFE</h1>
    </div>
  );
};

export default App;
EOL

  # Create index.tsx for Standalone
  cat > src/index.tsx <<EOL
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOL

  echo "my-app1-standalone setup complete."
}

# Create README files for both projects
generate_readme_files() {
  echo "Creating README.md files..."

  # Create README for my-app1-mfe
  cat > my-app1-mfe/README.md <<EOL
# my-app1-mfe (Micro Frontend App)

This is a micro frontend (MFE) app that exposes its components for use by other applications via Module Federation.

## Setup and Installation

1. Clone the repository:
   \`\`\`bash
   git clone <your-repository-url>
   cd my-app1-mfe
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run start
   \`\`\`

4. The app will be available at [http://localhost:3001](http://localhost:3001).

## Exposed Components

- The \`App\` component is exposed for use by other applications. It can be loaded dynamically via Module Federation.

## Usage in Other Apps

You can integrate this MFE app into other applications (like \`my-app1-standalone\`) using Module Federation by referencing the \`remoteEntry.js\` file:

\`\`\`js
remotes: {
  my_app1_mfe: 'my_app1_mfe@http://localhost:3001/remoteEntry.js',
}
\`\`\`

This allows your main app to load the \`App\` component dynamically at runtime.

## Development

- The app uses TypeScript, React, and Webpack 5.
- Webpack is configured for Module Federation.
- React is shared between the host and remote applications to ensure a single instance.

## Troubleshooting

- Ensure that \`my-app1-mfe\` is running on port 3001.
- If you're facing issues with loading components, check the browser console for any missing modules or network errors.
EOL

  # Create README for my-app1-standalone
  cat > my-app1-standalone/README.md <<EOL
# my-app1-standalone (Standalone App with MFE Integration)

This is a standalone React app that integrates with \`my-app1-mfe\` (a micro frontend) using Webpack Module Federation.

## Setup and Installation

1. Clone the repository:
   \`\`\`bash
   git clone <your-repository-url>
   cd my-app1-standalone
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Run the development server:
   \`\`\`bash
   npm run start
   \`\`\`

4. The app will be available at [http://localhost:3000](http://localhost:3000).

## Integration with \`my-app1-mfe\`

This standalone app loads the \`App\` component from \`my-app1-mfe\` using Module Federation. The MFE app is hosted at [http://localhost:3001](http://localhost:3001), and it is loaded dynamically into the standalone app.

- The \`App\` component is loaded at runtime using the \`remoteEntry.js\` file exposed by \`my-app1-mfe\`.

## Usage

1. The standalone app uses \`ModuleFederationPlugin\` to reference the remote module:
   \`\`\`js
   remotes: {
     my_app1_mfe: 'my_app1_mfe@http://localhost:3001/remoteEntry.js',
   },
   \`\`\`
2. This allows you to dynamically load the \`App\` component from \`my-app1-mfe\`.

## Development

- The app uses TypeScript, React, and Webpack 5.
- React and ReactDOM are shared between the host and remote applications to ensure compatibility.

## Troubleshooting

- Ensure that \`my-app1-mfe\` is running on port 3001 and accessible.
- If you're encountering issues, check the browser console for errors related to missing modules or failed network requests.
EOL

  echo "README.md files created."
}

# Main script execution
create_mfe_app
create_standalone_app
generate_readme_files

echo "Setup complete! Both my-app1-mfe and my-app1-standalone are ready."
