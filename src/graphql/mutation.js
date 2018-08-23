import gql from 'graphql-tag';

export const LOGIN_MUTATION = gql`
  mutation UserLogin($email: String!, $password: String!) {
    user_Login(email: $email, password: $password) {
      user {
        name
        email
      }
      token
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation UserCreate($email: String!, $password: String!) {
    user_C( 
      input: {
        isParent: true
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
// mutation userForgetPassword {
//   user_Forget_Password(email: "cage@gmail.com")
// }

