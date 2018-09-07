import React, { Component } from 'react';
import { View } from 'react-native';

import Color from 'constants/colors';
import style from 'styles/signin';

import { Text, Icon } from 'react-native-elements';


export default class PrivacyPolicy extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'PRIVACY POLICY',
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
            <Text style={style.subTitle}>Privacy Policy</Text>
          </View>
          <View style={style.formContainer}>
            <Text style={style.tosText}>Culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptartem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi ropeior architecto beatae vitae dicta sunt explicabo</Text>
          </View>
        </View>
      </View>
    );
  }
}
