import ReactDOM from "react-dom/client";

// import ReactDOM from "react-dom";
import { ConfigProvider } from "antd";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { store } from "@store";

import { configureAntd } from "@configs";

import "@assets/styles/globals.scss";

import { App } from "./App";

// import { App } from "./App";
configureAntd();

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ConfigProvider>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Provider>
);

// ReactDOM.render(
//   <Provider store={store}>
//     <BrowserRouter>
//       <ConfigProvider>
//         <App />
//       </ConfigProvider>
//     </BrowserRouter>
//   </Provider>,
//   document.getElementById("root")
// );
