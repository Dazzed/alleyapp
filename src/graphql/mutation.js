import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation UserLogin($email: String!, $password: String!) {
    user_Login(email: $email, password: $password) {
      user {
        name
        email
        id
      }
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation UserCreate($email: String!, $password: String!, $isParent: Boolean) {
    user_C( 
      input: {
        isParent: $isParent
        email: $email
        password: $password
      }
    )
  }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
  mutation userForgetPassword($email: String!) {
    user_Forget_Password(email: $email)
  }
`;


export const TEAM_MUTATION = gql`
  mutation TeamCreate($title: String!, $member: [ID!]) {
    team_C( 
      input: {
        title: $title
        members: $member
      }
    )
  }
`;

export const EDIT_USER_MUTATION = gql`
  mutation UserUpdate($id: ID!, $phone: String!, $name: String!, $dateOfBirth: String!, $address: String!, $interests: String!, $affiliations:String!) {
    user_U(
      id: $id 
      input: { 
        phone: $phone
        name: $name
        dateOfBirth: $dateOfBirth
        address: $address
        interests: $interests
        affiliations: $affiliations
      }
    )
  }
`;

export const DAUGHTER_CREATE_MUTATION = gql`
  mutation UserCreate( $phone: String, $name: String!, $dateOfBirth: String!, $address: String, $interests: String, $affiliations:String, $email: String) {
    user_C( 
      input: {
        isParent: false,
        email: $email
        phone: $phone
        name: $name
        dateOfBirth: $dateOfBirth
        address: $address
        interests: $interests
        affiliations: $affiliations
      }
    )
  }
`;

export const UPDATE_TEAM_MUTATION = gql`
  mutation TeamUpdate($id: ID!, $members: [ID!]) {
    team_U(
      id: $id
      input: {
        members: $members
      }
    )
  }
`;

