import React, { Component } from 'react';
import { View, TouchableOpacity, TouchableHighlight, AsyncStorage, Image, ScrollView } from 'react-native';
import { GET_DASHBOARD_BY_TEAM } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/dashboard';

import { Text, Icon } from 'react-native-elements';



export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      teamId: '',
      loadChallenge: false,
      isRefetch: false
    }
    AsyncStorage.setItem('IS_LOGIN', 'true');
  }
  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'DASHBOARD',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    },
    headerLeft: null
  });

  componentWillReceiveProps(nextProps){
    alert('Call everytime');
  }
  componentDidMount(){
    this.props.navigation.addListener('willFocus', (playload)=>{
      AsyncStorage.getItem('ACTIVE_TEAM').then((value) => {
        if(value !== this.state.teamId){
          this.setState({
            teamId: value,
            isRefetch: false,
          })
          this.refresh();
        }
      });
   });
  }

  async componentWillMount() {
    let team = await AsyncStorage.getItem('ACTIVE_TEAM');
    this.setState({
      teamId: team,
      isRefetch: false,
    })
  }



  loadChallenge = (id, activeMission) => {
    this.props.navigation.navigate('challenge', {
      id: id,
      teamId: this.state.teamId,
      missionTitle: activeMission,
      onGoBack: () => this.refresh(),
    });
  }

  refresh() {
    this.setState({isRefetch: true});
  }



  render() {
    return (
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={style.container}>
          <Query query={GET_DASHBOARD_BY_TEAM} variables={{ teamId: this.state.teamId }} fetchPolicy="network-only" notifyOnNetworkStatusChange={true}>
            {({ data: { team_Dashboard }, loading, refetch }) => {
              if(this.state.isRefetch){
                this.state.isRefetch = false
                refetch()
              }
              if (loading || !team_Dashboard) {
                return <Text>Loading ...</Text>;
              }
              {
                console.log('teamId hhh trueue iss: '+JSON.stringify(team_Dashboard))
                return (
                  <View style={style.dashboard}>
                    <View style={style.progressSummary}>
                      <Text style={style.sectionTitle}>PROGRESS SUMMARY</Text>
                      <View>
                        <View style={style.progressItems}>
                          <Text style={style.progressLabel}>Points to Date</Text>
                          <Text style={style.progressValue}>{team_Dashboard.pointsToDate}</Text>
                        </View>
                        <View style={style.progressItems}>
                          <Text style={style.progressLabel}>Active Mission</Text>
                          <Text style={style.progressValue}>{team_Dashboard.activeMission}</Text>
                        </View>
                        <View style={style.progressItems}>
                          <Text style={style.progressLabel}>Mission Deadline</Text>
                          <Text style={style.progressValue}>{team_Dashboard.missionDeadLine}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={style.challenges}>
                      <Text style={style.sectionTitle}>CHALLENGES IN {team_Dashboard.activeMission.toUpperCase()}</Text>
                        {team_Dashboard.currentMissionChallenges.map(challenge => {
                          return (
                            <TouchableHighlight key={challenge.title} onPress={() => this.loadChallenge(challenge.id, team_Dashboard.activeMission)}>
                              <View style={style.challengeItem}>
                                <View style={style.challengeTitleRow}>
                                  <View style={style.challengeTitleView}>
                                    <Text style={style.challengeTitle}>{challenge.title}</Text>
                                  </View>
                                  <Text style={style.challengePoints}>{challenge.maxPts} Pts</Text>
                                </View>
                                <View>
                                  <Text style={style.challengeLabel}>
                                    Estimated Time:
                                    <Text style={style.challengeValue}>{challenge.estTime}</Text>
                                  </Text>
                                </View>
                                <View>
                                  <Text style={style.challengeLabel}>
                                    Location:
                                    <Text style={style.challengeValue}>{challenge.location}</Text>
                                  </Text>
                                </View>
                                <View>
                                  <Text style={style.challengeStatus}>{challenge.status}</Text>
                                </View>
                              </View>
                            </TouchableHighlight>
                          );
                        })}
                    </View>
                  </View>
                );
              }
            }}
          </Query>
        }
        </View>
      </ScrollView>
    );
  }
}
