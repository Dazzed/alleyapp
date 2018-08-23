import gql from 'graphql-tag';

export const GET_USER = gql`
  query user_R($id: String!) {
    id
    isParent
    name
    dateOfBirth
    email
    phone
    address
    interests
    affiliations
  }
`;

