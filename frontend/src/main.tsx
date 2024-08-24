import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer} from 'react-toastify';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer position='bottom-right' />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
