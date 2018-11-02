import React, { Component } from 'react';
import { View, Text,AsyncStorage,Image} from 'react-native';

import style from 'styles/settings';
import Color from 'constants/colors';
import { Button } from 'react-native-elements';

export default class Settings extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Settings',
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
        <Button
          title="sign out"
          borderRadius={5}
          backgroundColor={Color.red}
          textStyle={{ fontWeight: 'bold' }}
          onPress={() => {
            AsyncStorage.setItem('IS_LOGIN', 'false');
            this.props.screenProps.signOut();
          }}
        />

      </View>
    );
  }
}
