import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App";
import "./index.css";
import { StateContextProvider } from "./context"
import { UseFetchProvider } from "./provider/UseFetchProvider"
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThirdwebProvider desiredChainId={ChainId.Goerli}>
    {/*YT : 38:37 */}
    <Router>
      <StateContextProvider>
        <UseFetchProvider>
          <App />
        </UseFetchProvider>
      </StateContextProvider>
    </Router>
  </ThirdwebProvider>
);
