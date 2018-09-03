import React, { Component } from 'react';
import { View, TouchableHighlight, AsyncStorage, Image, ScrollView } from 'react-native';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/challenge';

import { Text, Icon } from 'react-native-elements';


export default class Instructions extends Component {
  constructor() {
    super();
    this.state = {
      id: ''
    }
  }
  static navigationOptions = ({ navigation: { navigate, state } }) => ({
    title: state.params.missionTitle.toUpperCase(),
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  render() {
    const data = this.props.navigation.state.params.data;
    const type = this.props.navigation.state.params.type;
    return (
      <ScrollView>
        <View style={style.container}>
          {type === "text" ? <View><Text>{data}</Text></View> : ''}
          {type === "audio" ? <View><Text>Audio</Text></View> : ''}
          {type === "video" ? <View><Text>Video</Text></View> : ''}
        </View>
      </ScrollView>
    );
  }
}
