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
      // <View style={style.challenge}>
      //   <View style={style.challengeInfo}>
      //     <View style={style.challengeStrip}>
      //       <View style={style.challengeTitleView}>
      //         <Text style={style.challengeTitle}>{challenge_Team.title}</Text>
      //         <View style={style.challengePointsView}>
      //           <Text style={style.challengePoints}>{challenge_Team.pctDone} Pts</Text>
      //         </View>
      //       </View>
      //     </View>
      //     <View style={style.challengeDetailsView}>
      //       <View style={style.challengeBasicInfo}>
      //         <Text style={style.challengeDetailsLabel}>
      //           Available Points:
      //           <Text style={style.challengeDetailsValue}> {challenge_Team.maxPts}</Text>
      //         </Text>
      //         <Text style={style.challengeDetailsLabel}>
      //           Materials:
      //           <Text style={style.challengeDetailsValue}> {challenge_Team.materials}</Text>
      //         </Text>
      //       </View>
      //       <View style={style.challengeInfoView}>
      //         {
      //           challenge_Team.description.map(desc => {
      //             if (desc.type === "videoOverlay")
      //               return (
      //                 <TouchableHighlight onPress={() => this.loadInstructions(desc.url, 'videoOverlay')}>
      //                   <View style={style.challegeInfoIconsView}>
      //                     <Image style={style.challegeInfoIcons} source={require('../assets/images/video.png')} />
      //                   </View>
      //                 </TouchableHighlight>
      //               )
      //           })}
      //         {
      //           challenge_Team.description.map(desc => {
      //             if (desc.type === "audioOverlay")
      //               return (
      //                 <TouchableHighlight onPress={() => this.loadInstructions(desc.url, 'audioOverlay')}>
      //                   <View style={style.challegeInfoIconsView}>
      //                     <Image style={style.challegeInfoIcons} source={require('../assets/images/audio.png')} />
      //                   </View>
      //                 </TouchableHighlight>
      //               )
      //           })}
      //         {
      //           challenge_Team.description.map(desc => {
      //             if (desc.type === "textOverlay")
      //               return (
      //                 <TouchableHighlight onPress={() => this.loadInstructions(desc.data, 'textOverlay')}>
      //                   <View style={style.challegeInfoIconsView}>
      //                     <Image style={style.challegeInfoIcons} source={require('../assets/images/info.png')} />
      //                   </View>
      //                 </TouchableHighlight>
      //               )
      //           })}
      //       </View>
      //     </View>
      //     {
      //       challenge_Team.description.map(desc => {
      //         if (desc.type === "text")
      //         return (
      //           <View key={desc.id} style={style.challengeDetailsView}>
      //             <View style={style.challengeDescriptionView}>
      //               <ScrollView keyboardShouldPersistTaps='handled'>
      //                 <Text style={style.challengeDescription}>{desc.data}</Text>
      //               </ScrollView>
      //             </View>
      //           </View>
      //         )
      //     })}
      //   </View>
      //   <View style={style.challengeResponse}>
      //     {
      //       this.renderChallengeResponseForm(challenge_Team)
      //     }
      //   </View>
      //   <Modal
      //     animationType="fade"
      //     transparent={true}
      //     visible={this.state.showChatLoader}
      //     onRequestClose = {() => {
      //        this.setState({showChatLoader: false});
      //     }}
      //     style = {styleLoader.loaderMoedl}>
      //         <ProgressLoader />
      //   </Modal>
      // </View>
      </View>
    );
  }
}
