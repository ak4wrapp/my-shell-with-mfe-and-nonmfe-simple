// src/components/App3Tab.tsx
import React, { useState } from "react";

const App3Tab = () => {
  const [route, setRoute] = useState<string>("");

  // Change the route based on tab navigation (either /user or /admin)
  const handleRouteChange = (newRoute: string) => {
    setRoute(newRoute);
  };

  return (
    <div>
      <iframe
        title="my-app3"
        src={`http://localhost:3003/`}
        width="100%"
        height="800px"
        style={{ border: "none", marginTop: "20px" }}
      />
    </div>
  );
};

export default App3Tab;
