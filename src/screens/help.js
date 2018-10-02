import React, { Component } from 'react';
import { View, Linking, TouchableHighlight } from 'react-native';

import Color from 'constants/colors';
import styles from 'styles/help';

import { Text, Icon } from 'react-native-elements';


export default class Help extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'HELP',
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
          <TouchableHighlight style={[styles.box, styles.box1]} onPress={() => { this.props.navigation.navigate('faq') }}>
            <View>
              <Text h4 style={styles.box_text}>FAQs</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.box, styles.box2]} onPress={() => { this.props.navigation.navigate('resources') }}>
            <View>
              <Text h4 style={styles.box_text}>RESOURCES</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.row2}>
          <TouchableHighlight style={[styles.box, styles.box1]} onPress={() => Linking.openURL('mailto:help@alleyoopduos.com')}>
            <View>
              <Text h4 style={styles.box_text}>EMAIL{'\n'}SUPPORT</Text>
              <Text style={styles.box_subtext}>help@alleyoopduos.com</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.box, styles.box2]} onPress={() => Linking.openURL('tel:888-888-8888')}>
            <View>
              <Text h4 style={styles.box_text}>PHONE{'\n'}SUPPORT</Text>
              <Text style={styles.box_subtext}>888-888-8888</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
