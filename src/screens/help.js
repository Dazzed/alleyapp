import React, { Component } from 'react';
import { View, Linking } from 'react-native';

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
            <View style={[styles.box, styles.box1]}>
              <Text h4 style={styles.box_text} onPress={() => {this.props.navigation.navigate('faq')}}>FAQ'S</Text>
            </View>
            <View style={[styles.box, styles.box2]}>
              <Text h4 style={styles.box_text} onPress={() => {this.props.navigation.navigate('resources')}}>RESOURCES</Text>
            </View>
          </View>
          <View style={styles.row2}>
            <View style={[styles.box, styles.box1]}>
              <Text h4 style={styles.box_text}>EMAIL{'\n'}SUPPORT</Text>
            <Text style={styles.box_subtext} onPress={() => Linking.openURL('mailto:help@alleyoopduos.com')}>help@alleyoopduos.com</Text>
            </View>
            <View style={[styles.box, styles.box2]}>
              <Text h4 style={styles.box_text}>PHONE{'\n'}SUPPORT</Text>
              <Text style={styles.box_subtext} onPress={() => Linking.openURL('tel:888-888-8888')}>888-888-8888</Text>
            </View>
          </View>
        </View>
    );
  }
}
