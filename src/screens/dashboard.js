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
      backgroundColor: Color.transparent
    },
    headerBackground: (
      <Image
        style={{width: "100%",height: 75,}}
        source={require('../assets/images/header_bg.png')}
      />
    ),
    headerLeft: null
  });

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
            {({ data: { team_Dashboard }, loading, refetch}) => {
              if(this.state.isRefetch){
                this.state.isRefetch = false
                refetch()
              }
              if (loading || !team_Dashboard) {
                return <Text>Loading ...</Text>;
              }
              {
                return (
                  <View style={style.dashboard}>
                    <View style={style.progressSummary}>
                      <Text style={style.sectionTitle}>Progress Summary</Text>
                      <View>
                        <View>
                          <Text style={style.progressValue0}>{team_Dashboard.pointsToDate}</Text>
                          <Text style={style.progressLabel0}>Points to Date</Text>
                        </View>
                        <View style={style.progressItems0}>
                          <Text style={style.progressLabel}>Active Mission</Text>
                          <Text style={style.progressValue}>{team_Dashboard.activeMission}</Text>
                        </View>
                        <View style={style.progressItems0}>
                          <Text style={style.progressLabel}>Mission Deadline</Text>
                          <Text style={style.progressValue}>{team_Dashboard.missionDeadLine}</Text>
                        </View>
                      </View>
                    </View>
                    <View style={style.challenges}>
                      <Text style={style.sectionTitle}>Challenges in this Mission</Text> //{team_Dashboard.activeMission.toUpperCase()}
                        {team_Dashboard.currentMissionChallenges.map(challenge => {
                          return (
                            <TouchableHighlight style={{marginTop: 5,}} key={challenge.title} onPress={() => this.loadChallenge(challenge.id, team_Dashboard.activeMission)}>
                                <View style={{width: "100%",height: 120,position:'relative'}}>
                                  {challenge.status === 'COMPLETED'?
                                      <Image
                                        style={{width: "100%",height: 120,borderRadius: 20,resizeMode: 'stretch'}}
                                        source={require('../assets/images/challenge_purple_bg.png')}
                                      />
                                      :
                                      <Image
                                        style={{width: "100%",height: 120,borderRadius: 20,resizeMode: 'stretch'}}
                                        source={require('../assets/images/sky_blue_bg.png')}
                                      />
                                  }
                                  <View style={{width: "100%",height: 120 ,flexDirection: 'row',position:'absolute',top:0}}>
                                      <View style= {{width: "30%",height: 120,alignItem: 'center',justifyContent: 'center'}}>
                                          {challenge.status === 'Not yet started'?
                                              <Image
                                                style={{width: 35,height: 35,marginLeft: 'auto',marginRight: 'auto'}}
                                                source={require('../assets/images/pending_status.png')}
                                              />
                                              : challenge.status === 'STARTED'?
                                                  <Image
                                                    style={{width: 35,height: 35,marginLeft: 'auto',marginRight: 'auto'}}
                                                    source={require('../assets/images/started_status.png')}
                                                  />
                                                  :
                                                  <Image
                                                    style={{width: 35,height: 35,marginLeft: 'auto',marginRight: 'auto'}}
                                                    source={require('../assets/images/done_status.png')}
                                                  />
                                          }
                                          <Text style={style.challengePoints}>{challenge.score}/{challenge.maxPts} Pts</Text>
                                      </View>
                                      <View style= {{width: "70%",height: 120,position:'relative'}}>
                                          <Image
                                            style={{width: "100%",height: 120}}
                                            source={require('../assets/images/challenge-bg_transparent.png')}
                                          />
                                          <View style= {{width: "100%",height: 120,paddingLeft: 15, alignSelf: 'center', alignItem: 'center',justifyContent: 'center',position:'absolute',top:0}}>
                                                <Text style={style.challengeTitle} numberOfLines={1}>{challenge.title}</Text>
                                                <Text style={style.challengeLabel}>
                                                  Estimated Time:
                                                  <Text style={style.challengeValue}>{challenge.estTime}</Text>
                                                </Text>
                                                <Text style={style.challengeLabel}>
                                                  Location:
                                                  <Text style={style.challengeValue}>{challenge.location}</Text>
                                                </Text>
                                          </View>
                                      </View>
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
