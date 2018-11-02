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
      // <TouchableHighlight key={challenge.title} onPress={() => this.loadChallenge(challenge.id, team_Dashboard.activeMission)}>
      //   <View style={style.challengeItem}>
      //     <View style={style.challengeTitleRow}>
      //       <View style={style.challengeTitleView}>
      //         <Text style={style.challengeTitle}>{challenge.title}</Text>
      //       </View>
      //       <Text style={style.challengePoints}>{challenge.maxPts} Pts</Text>
      //     </View>
      //     <View>
      //       <Text style={style.challengeLabel}>
      //         Estimated Time:
      //         <Text style={style.challengeValue}>{challenge.estTime}</Text>
      //       </Text>
      //     </View>
      //     <View>
      //       <Text style={style.challengeLabel}>
      //         Location:
      //         <Text style={style.challengeValue}>{challenge.location}</Text>
      //       </Text>
      //     </View>
      //     <View>
      //       <Text style={style.challengeStatus}>{challenge.status}</Text>
      //     </View>
      //   </View>
      // </TouchableHighlight>
      </View>
    );
  }
}
