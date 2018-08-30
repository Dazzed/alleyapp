import gql from 'graphql-tag';

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user_R(id: $id) {
      id
      isParent
      name
      dateOfBirth
      email
      phone
      address
      interests
      affiliations
      profilePictureUrl
    }
  }
`;
export const GET_FAQ = gql`
  query {
  faq_RA {
    id
    question
    answer
  }
}
`;

export const GET_FAQ_DETAIL = gql`
  query FaqDetail($id: ID!) {
    faq_R(id: $id) {
      id
      question
      answer
    }
  }
`;

export const GET_RESOURCE = gql`
  query {
  resource_RA {
    id
    title
    type
    content
  }
}
`;

export const GET_RESOURCE_DETAIL = gql`
  query ResourceDetail($id: ID!) {
    resource_R(id: $id) {
      id
      title
      type
      content
    }
  }
`;

export const GET_TEAMS = gql`
  query GetTeams($memberId: ID!) {
    teamByMember(memberId: $memberId)
  }
`;