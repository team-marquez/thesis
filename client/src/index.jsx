import React from 'react'
import { render } from 'react-dom'
import App from './components/App.jsx'

import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-boost'

const defaults = {
  itinerary: '',
  userId: 'anon',
};

const client = new ApolloClient({ uri: 'http://10.16.3.118:4000/graphql', clientState: {defaults} })

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
)


export default client