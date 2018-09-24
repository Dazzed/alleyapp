import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, StatusBar } from 'react-native';
import Color from 'constants/colors';
import { TabNavigator, StackNavigator } from 'react-navigation';

import SignIn from 'auth/signin';
import Register from 'auth/register';
import ForgotPassword from 'auth/forgotPassword';
import Tos from 'auth/tos';
import PrivacyPolicy from 'auth/privacyPolicy';
import TeamProfileRegister from 'auth/teamProfile';
import DadProfileRegister from 'auth/dadProfile';
import DaughterProfileRegister from 'auth/daughterProfile';


import SocialFeed from 'screens/socialFeed';

import Help from 'screens/help';
import Faq from 'screens/faq';
import FaqDetail from 'screens/faqDetail';
import Resources from 'screens/resources';
import ResourcesDetails from 'screens/resourcesDetails';

import Dashboard from 'screens/dashboard';
import Challenge from 'screens/challenge';
import Instructions from 'screens/instructions';

import TeamProfile from 'screens/teamProfile';
import DadProfile from 'screens/dadProfile';
import DadTeams from 'screens/dadTeams';
import DaughterProfile from 'screens/daughterProfile';
import NewTeam from 'screens/newTeam';
import NewDaughter from 'screens/newDaughter';
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
                  name="store"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        secondTab: {
          screen: StackNavigator({
            help: { screen: Help },
            faq: {screen: Faq },
            faqDetail: {screen: FaqDetail },
            resources: { screen: Resources },
            resourcesDetails: { screen: ResourcesDetails }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Help',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="help"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        thirdTab: {
          screen: StackNavigator({
            dashboard: { screen: Dashboard },
            challenge: { screen: Challenge },
            instructions: { screen: Instructions }

          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Dashboard',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="dashboard"
                  color={!focused ? Color.darkBlue : 'white'}
                />
              )
            };
          }
        },
        fouthTab: {
          screen: StackNavigator({
            dadTeams: { screen: DadTeams },
            teamProfile: { screen: TeamProfile },
            dadProfile: { screen: DadProfile },
            daughterProfile: { screen: DaughterProfile },
            newTeam: { screen: NewTeam },
            newDaughter: { screen: NewDaughter }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarLabel: 'Profile',
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="verified-user"
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
                  name="settings"
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
          showIcon: true,
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
        teamProfile: { screen: TeamProfileRegister },
        dadProfile: { screen: DadProfileRegister },
        daughterProfile: { screen: DaughterProfileRegister },
        forgotPassword: { screen: ForgotPassword },
        privacyPolicy: { screen: PrivacyPolicy },
        tos: { screen: Tos }
      }
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
