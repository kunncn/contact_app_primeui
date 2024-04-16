import "./index.css";
import ReactDom from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { store } from "./store/store";
import { Provider } from "react-redux";

ReactDom.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <PrimeReactProvider value={{ ripple: true }}>
      <Provider store={store}>
        <App />
      </Provider>
    </PrimeReactProvider>
  </BrowserRouter>
);
