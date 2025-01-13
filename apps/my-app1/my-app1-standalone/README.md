# my-app1-standalone (Standalone App with MFE Integration)

This is a standalone React app that integrates with `my-app1-mfe` (a micro frontend) using Webpack Module Federation.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd my-app1-standalone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run start
   ```

4. The app will be available at [http://localhost:3000](http://localhost:3000).

## Integration with `my-app1-mfe`

This standalone app loads the `App` component from `my-app1-mfe` using Module Federation. The MFE app is hosted at [http://localhost:3001](http://localhost:3001), and it is loaded dynamically into the standalone app.

- The `App` component is loaded at runtime using the `remoteEntry.js` file exposed by `my-app1-mfe`.

## Usage

1. The standalone app uses `ModuleFederationPlugin` to reference the remote module:
   ```js
   remotes: {
     my_app1_mfe: 'my_app1_mfe@http://localhost:3001/remoteEntry.js',
   },
   ```
2. This allows you to dynamically load the `App` component from `my-app1-mfe`.

## Development

- The app uses TypeScript, React, and Webpack 5.
- React and ReactDOM are shared between the host and remote applications to ensure compatibility.

## Troubleshooting

- Ensure that `my-app1-mfe` is running on port 3001 and accessible.
- If you're encountering issues, check the browser console for errors related to missing modules or failed network requests.
