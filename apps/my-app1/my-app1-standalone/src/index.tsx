import React from 'react';
import ReactDOM from 'react-dom/client';

// Dynamically import App from the MFE (my_app1_mfe)
const App = React.lazy(() => import('my_app1_mfe/App')); // This is the remote module

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>
);
