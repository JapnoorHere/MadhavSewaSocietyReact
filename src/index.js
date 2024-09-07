import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './utils/store.js';
import Loader from './components/Loader.jsx';
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        <Loader />
        <App />
    </Provider>
);
