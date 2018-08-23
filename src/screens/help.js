import React, { Component } from 'react';
import { View } from 'react-native';

import Color from 'constants/colors';
import styles from 'styles/help';

import { Text, Icon } from 'react-native-elements';


export default class Help extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Help',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.row}>
            <View style={[styles.box, styles.box1]}></View>
            <View style={[styles.box, styles.box2]}></View>
          </View>
          <View style={styles.row2}>
            <View style={[styles.box, styles.box1]}></View>
            <View style={[styles.box, styles.box2]}></View>
          </View>

        </View>
    );
  }
}
