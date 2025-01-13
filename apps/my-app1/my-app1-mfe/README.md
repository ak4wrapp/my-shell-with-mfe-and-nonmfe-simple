# my-app1-mfe (Micro Frontend App)

This is a micro frontend (MFE) app that exposes its components for use by other applications via Module Federation.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd my-app1-mfe
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run start
   ```

4. The app will be available at [http://localhost:3001](http://localhost:3001).

## Exposed Components

- The `App` component is exposed for use by other applications. It can be loaded dynamically via Module Federation.

## Usage in Other Apps

You can integrate this MFE app into other applications (like `my-app1-standalone`) using Module Federation by referencing the `remoteEntry.js` file:

```js
remotes: {
  my_app1_mfe: 'my_app1_mfe@http://localhost:3001/remoteEntry.js',
}
```

This allows your main app to load the `App` component dynamically at runtime.

## Development

- The app uses TypeScript, React, and Webpack 5.
- Webpack is configured for Module Federation.
- React is shared between the host and remote applications to ensure a single instance.

## Troubleshooting

- Ensure that `my-app1-mfe` is running on port 3001.
- If you're facing issues with loading components, check the browser console for any missing modules or network errors.
