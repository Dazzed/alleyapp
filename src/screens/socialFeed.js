import React, { Component } from 'react';
import { View, Image } from 'react-native';

import Color from 'constants/colors';
import style from 'styles/signin';

import { Text, Icon } from 'react-native-elements';


export default class SocialFeed extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Social Feed',
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
          </View>
          <View style={style.formContainer}>
            <Image
              source={require('../assets/images/alley-oop-logo-big.png')}
              style={style.logoImg}
            />

            <Text style={style.tosText}>Coming Soon!</Text>
          </View>
        </View>
      </View>
    );
  }
}
