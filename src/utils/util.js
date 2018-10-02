import { AsyncStorage } from 'react-native';

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER = 'USER';
const USER_INFO = 'USER_INFO';
const ACTIVE_TEAM = 'ACTIVE_TEAM';
let token;
let user;
let userInfo;
let activeTeam;

export const getToken = async () => {
  if (token) {
    return Promise.resolve(token);
  }

  token = await AsyncStorage.getItem(AUTH_TOKEN);
  token = await AsyncStorage.getItem('AUTH_TOKEN');
  return token;
};

export const setToken = (newToken) => {
  token = newToken;
  return AsyncStorage.setItem(AUTH_TOKEN, newToken);
};

export const getActiveTeam = async () => {
  if (activeTeam) {
    return Promise.resolve(activeTeam);
  }

  activeTeam = await AsyncStorage.getItem(ACTIVE_TEAM);
  return activeTeam;
};

export const setActiveTeam = (newTeam) => {
  activeTeam = newTeam;
  return AsyncStorage.setItem(ACTIVE_TEAM, newTeam);
};

export const signOut = () => {
  token = undefined;
  user = undefined;
  AsyncStorage.removeItem(USER);
  return AsyncStorage.removeItem(AUTH_TOKEN);
};

export const setUser = (newUser) => {
  user = newUser;
  return AsyncStorage.setItem(USER, newUser);
}
export const setUserInfo = (newUserInfo) => {
  userInfo = newUserInfo;
  return AsyncStorage.setItem(USER_INFO, newUserInfo);
}
export const getUser = async () => {
  if (user) {
    return Promise.resolve(user);
  }

  user = await AsyncStorage.getItem(USER);
  return user;
};
