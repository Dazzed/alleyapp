import React, { Component } from 'react';
import { View, Image,AsyncStorage} from 'react-native';

import Color from 'constants/colors';
import style from 'styles/signin';

import { Text, Icon } from 'react-native-elements';



export default class Store extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Store',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.transparent
    },
    headerBackground: (
      <Image
        style={{width: "100%",height: 75}}
        source={require('../assets/images/header_bg.png')}
      />
    ),
  });


    render() {
      return (
        <View style={style.container}>
            <View style={style.welcomeContainer}>
                <Image resizeMode="contain"
                  source={require('../assets/images/alley-oop.png')}
                  style={style.logoName0}
                />
                <Text style={style.subTitle}>Deepening inter-generational relationships through play</Text>
            </View>
            <Image resizeMode="contain"
              source={require('../assets/images/alley-oop-logo.png')}
              style={style.logoImg1}
            />
            <View>
              <Text style={style.text40}>STORE</Text>
              <Text style={style.text14}>Coming Soon...</Text>
            </View>
            <View/>
        </View>
      );
    }

}
