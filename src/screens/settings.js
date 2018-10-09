import React, { Component } from 'react';
import { View, Text,AsyncStorage} from 'react-native';

import style from 'styles/settings';
import Color from 'constants/colors';
import { Button } from 'react-native-elements';

export default class Settings extends Component {
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'SETTINGS',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
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
