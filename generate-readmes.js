const fs = require('fs');
const path = require('path');

// Define the content for the README files
const myApp1MfeReadme = `# my-app1-mfe (Micro Frontend App)

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
`;

const myApp1StandaloneReadme = `# my-app1-standalone (Standalone App with MFE Integration)

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
`;

const writeReadme = (filePath, content) => {
  // Ensure that the directory exists, create it if it doesn't
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Created README.md at: ${filePath}`);
};

// Create README for my-app1-mfe
writeReadme(path.join(__dirname, 'my-app1-mfe', 'README.md'), myApp1MfeReadme);

// Create README for my-app1-standalone
writeReadme(path.join(__dirname, 'my-app1-standalone', 'README.md'), myApp1StandaloneReadme);
