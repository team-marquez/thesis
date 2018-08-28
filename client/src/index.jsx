import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from './components/App.jsx'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const defaults = {
  itinerary: '',
  userId: 'anon'
}

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  clientState: { defaults }
})

render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('app')
)

export default client