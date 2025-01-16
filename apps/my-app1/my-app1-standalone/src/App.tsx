import React from "react";
// Dynamically import App from the MFE (my_app1_mfe)
const MfeApp1 = React.lazy(() => import("my_app1_mfe/App")); // This is the remote module

const App = () => (
  <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
    <div style={{ padding: "20px", backgroundColor: "lightgray" }}>
      Hello from my-app1/my-app1-standalone!
    </div>
    <React.Suspense fallback={<div>Loading...</div>}>
      <div style={{ flex: 1 }}>
        <MfeApp1 />
      </div>
    </React.Suspense>
  </div>
);

export default App;
