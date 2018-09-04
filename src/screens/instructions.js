import React, { Component } from 'react';
import { View, TouchableHighlight, Image, ScrollView } from 'react-native';
import Video from 'react-native-video';

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
      <View style={style.container}>
        <ScrollView>
          {type === "text" ? <View><Text>{data}</Text></View> : ''}
          {(type === "audio") ? <View style={style.challenge}><Video source={{ uri: data }} ref={(ref) => {
            this.player = ref
          }}
            onBuffer={this.onBuffer}
            audioOnly={true}
            poster="https://placehold.it/300x200"
            onEnd={this.onEnd}
            onError={this.videoError}
            style={style.backgroundVideo} /></View> : ''}
          {(type === "video") ? <View style={style.challenge}><Video source={{ uri: data }} ref={(ref) => {
            this.player = ref
          }}
            onBuffer={this.onBuffer}
            onEnd={this.onEnd}
            onError={this.videoError}
            style={style.backgroundVideo} /></View> : ''}            
        </ScrollView>
      </View>
    );
  }
}
