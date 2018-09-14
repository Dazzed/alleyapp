import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';

import Color from 'constants/colors';
import style from 'styles/home';
import SettingsButton from 'components/settingsNavButton';

export default class Home extends Component {

  render() {
    return (
      <View style={style.container}>
        <StatusBar barStyle="light-content" />
        <Text style={style.title}>Go back to first Tab</Text>
      </View>
    );
  }
}
