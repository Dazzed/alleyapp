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
      // {this.state.showBubbleQuestion === false ?
      //   <View style={style.bubblesView}>
      //     {this.renderBubbles(this.state.challengeResponseDetail)}
      //   </View>
      //   :
      //   <View>
      //     <View style={style.bubbleQuestionView}>
      //       <View style = {style.viewQuestionIconChallenge2}>
      //         <Image style={style.iconImageQuestionChallenge2} source={this.chatIcons[0].file} />
      //       </View>
      //       <View style = {style.viewQuestionTextChallenge2}>
      //         <Text style={style.questionChallenge2Text}>{this.state.activeBubbleQuestion}</Text>
      //       </View>
      //     </View>
      //     {this.state.requestTypeChitChat === 'bubble' ?
      //         <TextInput
      //           style={style.inputChitChatAnswer}
      //           placeholder="Please type answer here"
      //           multiline = {true}
      //           numberOfLines = {5}
      //           value={this.state.setChitChatAnswer}
      //           onChangeText={(setChitChatAnswer) => this.setState({setChitChatAnswer})}
      //         />
      //         :
      //         <View style={style.chitChatEitherOrParentView}>
      //           {this.renderEitherOr(this.state.activeBubbledataObj.data)}
      //         </View>
      //       }
      //   </View>
      // }

      // {this.state.showBubbleQuestion === false ?
      //   <
      //   :
      //   <View style = {{width: "100%",height: 1000,backgroundColor: "#4A035E",}}>
      //       <StatusBar barStyle = "light-content" hidden = {false} backgroundColor = "#4A035E" translucent = {true}/>
      //   </View>
      // }
      </View>
    );
  }
}
