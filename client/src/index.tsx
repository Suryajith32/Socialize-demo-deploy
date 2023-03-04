import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import UserReducer from './services/Reducers/UserReducer';
import UserDataReducer from './services/Reducers/UserDataReducer';
import AdminReducer from './services/Reducers/AdminReducer';



const store = configureStore({
  reducer:{
    user:UserReducer,
    userData:UserDataReducer,
    admin:AdminReducer,
  }
})


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
     <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

