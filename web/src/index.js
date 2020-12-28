import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import { ApolloProvider } from '@apollo/react-hooks'
import ApolloClient from 'apollo-boost'

import * as serviceWorker from './serviceWorker'
import i18n from './lib/i18n'
import { TitleProvider } from './contexts/TitleContext'
import { AppProvider } from './contexts/AppContext'
import App from './App'

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_GRAPHQL,
})

ReactDOM.render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <TitleProvider title={process.env.REACT_APP_APP_NAME}>
        <Suspense fallback={<div />}>
          <ApolloProvider client={client}>
            <AppProvider>
              <App />
            </AppProvider>
          </ApolloProvider>
        </Suspense>
      </TitleProvider>
    </I18nextProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)

serviceWorker.unregister()
