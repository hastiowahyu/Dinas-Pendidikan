import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import store from './store';

// const globalState = {
//   jumlahBarang: 0,
//   totalHarga: 0,
//   kategoriElektronik: 0
// }

// const rootReducer = (state = globalState, action) => {
//   if (action.type === 'JUMLAH_BARANG') {
//     console.log('action.payload', action.payload)
//       return  {
//         ...state, jumlahBarang: 1 + action.payload
//       }
//   }
//   return state;
// }

// const storeRedux = createStore(rootReducer);

// storeRedux.subscribe(() => {
//   console.log('store change :>> ', storeRedux.getState());
// })

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
