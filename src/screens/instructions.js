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
      <ScrollView>
        <View style={style.container}>
          {type === "text" ? <View><Text>{data}</Text></View> : ''}
          {type === "audio" ? <View><Text>Audio</Text></View> : ''}
          {type === "video" ? <View style={style.challenge}><Video source={{ uri: "https://challenge-assets.s3.amazonaws.com/1535968519871.mp4" }} ref={(ref) => {
            this.player = ref
          }}                                     
            onBuffer={this.onBuffer}             
            onEnd={this.onEnd}                   
            onError={this.videoError} 
            style={style.backgroundVideo} /></View> : ''}
        </View>
      </ScrollView>
    );
  }
}
