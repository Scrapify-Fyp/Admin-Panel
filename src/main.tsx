import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/app.scss";
import App from './App';
import { Provider } from 'react-redux';
import store from './pages/Redux/store';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
  </Provider>,
  </React.StrictMode>,
)

