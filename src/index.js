import React from 'react'
import ReactDOM from 'react-dom'
import {Provider as ProviderRedux} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store'
import AppRoutes from './AppRoutes'
import {ToastProvider} from 'react-toast-notifications'
import * as serviceWorker from './serviceWorker'

/* styles part */
import './index.css'
import './scss/main.scss'

ReactDOM.render(
    <ProviderRedux store={store}>
        <BrowserRouter>
            <ToastProvider>
                <React.StrictMode>
                    <AppRoutes />
                </React.StrictMode>
            </ToastProvider>
        </BrowserRouter>
    </ProviderRedux>,
  document.getElementById('root')
)

serviceWorker.unregister()
