import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, StatusBar } from 'react-native';
import Color from 'constants/colors';
import { TabNavigator, StackNavigator } from 'react-navigation';

import SignIn from 'auth/signin';
import Register from 'auth/register';
import ForgotPassword from 'auth/forgotPassword';
import Tos from 'auth/tos';
import PrivacyPolicy from 'auth/privacyPolicy';

import SocialFeed from 'screens/socialFeed';
import Help from 'screens/help';
import Dashboard from 'screens/dashboard';
import TeamProfile from 'screens/teamProfile';
import DadProfile from 'screens/dadProfile';
import DadTeams from 'screens/dadTeams';
import DaughterProfile from 'screens/daughterProfile';
import Settings from 'screens/settings';


import Home from 'screens/home';
import ChuckNorris from 'screens/chucknorris';

import { Icon } from 'react-native-elements';

export default class Main extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false
    };
    Text.defaultProps.allowFontScaling = false;
  }
  

  componentWillMount() {
    this.checkIfSignedIn();
  }

  changeLoggedInStatus() {
    this.setState({ isLoggedIn: !this.state.isLoggedIn });
  }

  checkIfSignedIn() {
    window.RNB_user = {};
    AsyncStorage.getItem('user_info')
      .then(res => {
        if (res) {
          var user = JSON.parse(res);
          window.RNB_user = {
            ...user,
            token: user.auth_token
          };
          this.setState({ isLoggedIn: true });
        }
      })
      .done();
  }

  renderContent() {
    const MainNavigation = TabNavigator(
      {
        firstTab: {
          screen: StackNavigator({
            socialFeed: { screen: SocialFeed }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Social Feed',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="arrow-back"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        secondTab: {
          screen: StackNavigator({
            help: { screen: Help }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Help',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="arrow-back"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        thirdTab: {
          screen: StackNavigator({
            dashboard: { screen: Dashboard }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="arrow-back"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        fouthTab: {
          screen: StackNavigator({
            teamProfile: { screen: TeamProfile },
            dadProfile: { screen: DadProfile },
            daughterProfile: { screen: DaughterProfile },
            dadTeams: { screen: DadTeams }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Profile',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="arrow-back"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        fifthTab: {
          screen: StackNavigator({
            settings: { screen: Settings }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Settings',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="arrow-back"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        }        
      },
      {
        tabBarOptions: {
          inactiveTintColor: Color.darkBlue,
          activeTintColor: 'white',
          style: {
            height: 55,
            backgroundColor: Color.main
          }
        }
      }
    );

    const Authentication = StackNavigator(
      {
        signin: { screen: SignIn },
        register: { screen: Register },
        forgotPassword: { screen: ForgotPassword },
        privacyPolicy: { screen: PrivacyPolicy },
        tos: { screen: Tos }
      },
      { headerMode: 'none' }
    );

    if (this.state.isLoggedIn) {
      return <MainNavigation screenProps={{ signOut: this.changeLoggedInStatus.bind(this) }} />;
    }
    return <Authentication screenProps={{ signIn: this.changeLoggedInStatus.bind(this) }} />;
  }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="dark-content" />
          {this.renderContent()}
        </View>
      ); 
  }
}
