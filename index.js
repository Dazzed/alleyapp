import React from 'react';
import { AppRegistry } from 'react-native';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import gql from 'graphql-tag';

import App from './src/App';

console.ignoredYellowBox = ['Remote debugger'];

const client = new ApolloClient({
  uri: 'https://mz2r9bn14h.execute-api.us-east-1.amazonaws.com/production/'
});

// client
//   .query({
//     query: gql`
//       {
//         user_R(id: "e6628eef-ed7c-4489-9675-fd7dea6ab104") {
//           id
//           isParent
//           name
//           dateOfBirth
//           email
//           phone
//           address
//           interests
//           affiliations
//         }
//       }
//     `
//   })
//   .then(result => console.log({result}));

const ApolloApp = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

AppRegistry.registerComponent('alleyoop', () => ApolloApp);
