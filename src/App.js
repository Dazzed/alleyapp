import React, { Component } from 'react';
import { View, Image, Text, AsyncStorage, StatusBar } from 'react-native';
import Color from 'constants/colors';
import { TabNavigator, StackNavigator } from 'react-navigation';

import SignIn from 'auth/signin';
import DesignTest from 'auth/DesignTest';
import Register from 'auth/register';
import ForgotPassword from 'auth/forgotPassword';
import Tos from 'auth/tos';
import PrivacyPolicy from 'auth/privacyPolicy';
import TeamProfileRegister from 'auth/teamProfile';
import DadProfileRegister from 'auth/dadProfile';
import DaughterProfileRegister from 'auth/daughterProfile';


import SocialFeed from 'screens/socialFeed';
import Store from 'screens/store';

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
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="dashboard"
                  color={!focused ? '#8D8F91' : '#1365A7'}
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
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="help-outline"
                  color={!focused ? '#8D8F91' : '#1365A7'}
                />
              )
            };
          }
        },
        thirdTab: {
          screen: StackNavigator({
            dashboard: { screen: Dashboard},
            challenge: { screen: Challenge },
            instructions: { screen: Instructions }
          }),
          navigationOptions: ({ navigation, screenProps}) => {
            return {
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="dashboard"
                  color={!focused ? '#8D8F91' : '#1365A7'}
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
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="verified-user"
                  color={!focused ? '#8D8F91' : '#1365A7'}
                />

              )

            };
          }
        },
        fifthTab: {
          screen: StackNavigator({
            store: { screen: Store }
          }),
          navigationOptions: ({ navigation, screenProps }) => {
            return {
              tabBarIcon: ({ focused, tintColor }) => (
                <Icon
                  name="local-grocery-store"
                  color={!focused ? '#8D8F91' : '#1365A7'}
                />
              )
            };
          }
        }
      },
      {
        initialRouteName: 'thirdTab',
        tabBarOptions: {
          inactiveTintColor: '#8D8F91',
          activeTintColor: '#1365A7',
          showIcon: true,
          showLabel: false,
          style: {
            height: 55,
            backgroundColor: Color.white
          }
        }
      }
    );

    const Authentication = StackNavigator(
      {
        signin: { screen: SignIn },
        designTest: { screen: DesignTest },
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
        <View style={{flex: 1, backgroundColor: "#FFFFFF"}}>
          <StatusBar barStyle="light-content" hidden = {false} backgroundColor = "#FFFFFF" translucent = {true} />
          {this.renderContent()}
        </View>
      );
  }
}
