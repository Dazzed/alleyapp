import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
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
          {type === "text" ? <View key={"text"}><Text>{data}</Text></View> : ''}

          {(type === "audio") ? <View style={style.backgroundVideo} key={"audio"}><Video source={{ uri: data }}
            audioOnly={true}
            poster="https://placehold.it/300x200"
            onBuffer={this.onAudioBuffer}
            onEnd={this.onAudioEnd}
            onError={this.onAudioError}
            style={style.video} /></View> : ''}
          {(type === "video") ? <View style={style.backgroundVideo} key={"video"}><Video source={{ uri: data }}
            onBuffer={this.onVideoBuffer}
            onEnd={this.onVideoEnd}
            onError={this.onVideoError}
            style={style.video} /></View> : ''}
        </ScrollView>
      </View>
    );
  }
}
