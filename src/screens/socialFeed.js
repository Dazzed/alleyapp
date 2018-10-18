import React, { Component } from 'react';
import { View, Image,AsyncStorage} from 'react-native';

import Color from 'constants/colors';
import style from 'styles/signin';

import { Text, Icon } from 'react-native-elements';


export default class SocialFeed extends Component {
  constructor() {
    super();
    AsyncStorage.setItem('IS_LOGIN', 'true');
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'SOCIAL FEED',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  render() {
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.welcomeContainer}>
            <Text style={style.subTitle}>Social Feed</Text>
            <Image resizeMode="contain"
              source={require('../assets/images/alley-oop-logo.png')}
              style={style.logoImg}
            />
          </View>
          <View style={style.formContainer}>

            <Text style={style.tosText}>Coming Soon!</Text>
          </View>
        </View>
      </View>
    );
  }
}
