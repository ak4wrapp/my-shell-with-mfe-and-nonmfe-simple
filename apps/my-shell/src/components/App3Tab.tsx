// src/components/App3Tab.tsx
import React, { useState } from "react";

const App3Tab = () => {
  return (
    <div>
      <iframe
        title="my-app3"
        src={`http://localhost:3004/`}
        width="100%"
        height="800px"
        style={{ border: "none", marginTop: "20px" }}
      />
    </div>
  );
};

export default App3Tab;
