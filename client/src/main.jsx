import React from 'react'
import ReactDOM from 'react-dom/client'
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App.jsx'
import './styles/index.css'
import { store } from './app/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Auth0Provider domain="dev-r5c03l0nzuw4zgfm.us.auth0.com"
    clientId="ibRj3MCZjjka2UA3pMarYvLnPHIVLY6U"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
            <App />
        </Auth0Provider>
    </Provider>,
)
