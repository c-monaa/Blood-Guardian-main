import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // all the components in the app componenet will now be able to access the store.....
  <Provider store = {store}>
    <ConfigProvider theme={{ token: { colorPrimary: "#802828" ,colorBorder: "#802828",} }}>
      <App />
    </ConfigProvider>
  </Provider>,
);
