import React from 'react';
import { AppRegistry } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import App from './src/App';

console.ignoredYellowBox = ['Remote debugger'];

const client = new ApolloClient({
  uri: 'https://hhzcnb1ek2.execute-api.us-east-1.amazonaws.com/production/'
});

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent('alleyoop', () => ApolloApp);
