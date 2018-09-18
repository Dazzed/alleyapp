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



export const GET_DASHBOARD_BY_TEAM = gql`
  query GetDashboardByTeam($teamId: ID!) {
    team_Dashboard(teamId: $teamId) {
      pointsToDate
      activeMission
      missionDeadLine
      currentMissionChallenges
    }
  }
`;

export const GET_CHALLENGE = gql `
  query GetChallenge($challengeId: ID!, $teamId: ID!) {
    challenge_Team(challengeId: $challengeId, teamId: $teamId) {
      id
      artboardDetails
      type
      missionID
      title
      materials
      pctDone
      location
      requests {
        id
        requestType
        type
        data
        url
        qty
        response
        dataObj
      }
      description {
        id
        type
        data
        url
        qty
      }
      ageLimit {
        min
        max
      }
      maxPts
      estTime
    }
  }

`;
