import React from 'react';

const App1 = React.lazy(() => import('myApp1MFE/App'));

const App = () => (
  <div>
    <header>
      <h1>My Shell App</h1>
    </header>
    <nav>
      <ul>
        <li><a href="#app1">App 1</a></li>
        <li><a href="#app2">App 2</a></li>
      </ul>
    </nav>
    <main>
      <React.Suspense fallback={<div>Loading App 1...</div>}>
        <App1 />
      </React.Suspense>
      <iframe src="http://localhost:3003" style={{ width: '100%', height: '600px', border: 'none' }} title="App 2"></iframe>
    </main>
    <footer>
      <p>Footer content</p>
    </footer>
  </div>
);

export default App;
