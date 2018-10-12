import React, { Component,  } from 'react';
import { View, TouchableHighlight, AsyncStorage, Image, ScrollView} from 'react-native';
import { GET_USER, GET_TEAMS } from '../graphql/queries';
import { Mutation } from "react-apollo";
import { DELETE_TEAM } from '../graphql/mutation';
import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { Text, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';


export default class DadTeams extends Component {

  constructor() {
    super();
    this.state = {
      member: '',
      uniqueKey: 1,
      isSwiping: false,
      isCloseSwipe: false,
      show_something: false,
      teamID: null,
      team_D: null,
      teamIDActivated: null,
      currentlyOpenSwipeable: null,
      isRefetch: false,
      totalTeams: 0,
      isDeleteActiveTeam: false,
    };
    this.deleteTeam = this.deleteTeam.bind(this);
  }

  handleScroll = () => {
    const {currentlyOpenSwipeable} = this.state;
    if (currentlyOpenSwipeable) {
      currentlyOpenSwipeable.recenter();
    }
  };

  refresh() {
    this.setState({isRefetch: true});
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'TEAMS',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    },
    headerLeft: null,
    headerRight: (
      <TouchableHighlight onPress={() =>  {navigate('newTeam')}}>
        <View style={{width: 40,height:40,alignItems: 'center',marginRight: 5}}>
          <Image style={{
            width: 36,
            height: 39,
            borderRadius: 18
          }}
          source={require('../assets/images/add_icon_white.png')} />
        </View>
      </TouchableHighlight>
    ),
  });

  componentDidMount(){
    AsyncStorage.getItem('ACTIVE_TEAM').then((value) => {
        this.setState({teamIDActivated: value})
    });
  }

  showDadInfo = () => {
    this.props.navigation.navigate('dadProfile', {
      id: this.state.member
    });
  }

  actionMakeTeamActive = () => {
    this.setState({teamIDActivated: this.state.teamID})
    AsyncStorage.setItem('ACTIVE_TEAM', this.state.teamID);
    let team = AsyncStorage.getItem('ACTIVE_TEAM');
    this.state.currentlyOpenSwipeable.recenter();
    console.log(86, team);
  }

  actionDeleteTeam = () => {
    if(this.state.totalTeams > 1){
        this.deleteTeam(this.state.team_D);
    }else{
        this.state.currentlyOpenSwipeable.recenter();
        alert('Sorry! You need to atleast more than one team for delete team.')
    }

  }

  clickAddTeam = () => {
    this.props.navigation.navigate('newTeam');
  }

  deleteTeam = async targetMutation => {
      try {
        const data = await targetMutation({ variables: {teamID: this.state.teamID}});
        console.log(88, data.data.team_D);
        if(data.data.team_D === true){
            if(this.state.teamID === this.state.teamIDActivated){
              this.state.isDeleteActiveTeam = true;
            }
            this.state.currentlyOpenSwipeable.recenter();
            this.refresh();
        }else{
            alert('Team not deleted.')
        }
      } catch (e) {
        console.log('Error in signIn', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }

  showTeamDetail = team => {
    this.props.navigation.navigate('teamProfile', {
      id: team.id,
      dad: team.members[0].id,
      daughter: team.members[1].id,
      title: team.title,
      teamPictureUrl: team.teamPictureUrl
    })
  }

  async componentWillMount() {
    let user = await AsyncStorage.getItem('USER');

    this.setState({
      member: user
    })
  }
  render() {
    const {currentlyOpenSwipeable} = this.state;
    const itemProps = {
      onOpen: (event, gestureState, swipeable) => {
        if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
          currentlyOpenSwipeable.recenter();
        }
        this.setState({currentlyOpenSwipeable: swipeable});
      },
      onClose: () => this.setState({currentlyOpenSwipeable: null})
    };


    return (
      <ScrollView keyboardShouldPersistTaps='handled' style={style.containerScrollbar}>
        <View style={style.container}>
          <View style={style.subContainer}>
            <View >
            {(this.state.member != '') ?
              <Query query={GET_USER} variables={{ id: this.state.member }} fetchPolicy="network-only">
                {({ data: { user_R }, loading}) => {
                  if (loading || !user_R) {
                    return <Text>Loading ...</Text>;
                  }
                  {
                    return (
                      <TouchableHighlight style={style.dadProfile} onPress={() => this.showDadInfo()}>
                        <View>
                          <Image style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25
                          }}
                          source={{
                            uri: (user_R.profilePictureUrl) ? user_R.profilePictureUrl : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                          }} />
                          <Text style={style.partnerName}>{user_R.name}</Text>
                        </View>
                      </TouchableHighlight>
                    );
                  }
                }}
              </Query>
              : <View></View>
              }
              <View style={style.flexGrid}>
                {this.state.member != '' ?
                  <Query query={GET_TEAMS} variables={{ memberId: this.state.member }} fetchPolicy="network-only">
                    {({ data: { teamByMember }, loading, refetch}) => {
                      if(this.state.isRefetch){
                        if(!this.state.isDeleteActiveTeam){
                          this.state.isRefetch = false
                        }
                        refetch()
                      }
                      if (loading || !teamByMember) {
                      return <Text>Loading ...</Text>;
                    }
                    {
                      return teamByMember.map(team => {
                        let partners = team.members.filter(member_user => {
                          return member_user.id !== this.state.member
                        })
                        this.state.totalTeams = teamByMember.length
                        if(this.state.isDeleteActiveTeam && this.state.isRefetch){
                          if(team.id !== this.state.teamIDActivated){
                            this.state.isDeleteActiveTeam = false
                            this.state.isRefetch = false
                            this.state.teamIDActivated = team.id
                            AsyncStorage.setItem('ACTIVE_TEAM', team.id)
                          }
                        }
                        return (
                          <Mutation mutation = {DELETE_TEAM}>
                            {(team_D) => (
                                <View style={style.flexItem1} key={team.id}>
                                <Swipeable
                                  onSwipeStart={() => this.setState({isSwiping: true})}
                                  onSwipeRelease={() => this.setState({isSwiping: false,teamID: team.id, team_D: team_D})}
                                  rightButtons={[
                                    <TouchableHighlight style = {style.swipeViewOption1} onPress={() => this.actionMakeTeamActive()}><Text style = {{color: 'white', textAlign:'center',}}>Make team Active</Text></TouchableHighlight>,
                                    <TouchableHighlight style = {style.swipeViewOption2} onPress={() => this.actionDeleteTeam()}><Text style = {{color: 'white',textAlign:'center',}}>Delete Team</Text></TouchableHighlight>
                                  ]}
                                  onRightButtonsOpenRelease={(event, gestureState, swipeable) => {
                                    if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                                      currentlyOpenSwipeable.recenter();
                                    }
                                    this.setState({currentlyOpenSwipeable: swipeable});
                                  }}
                                  onRightButtonsCloseRelease={() => this.setState({currentlyOpenSwipeable: null})}>

                                  <TouchableHighlight style={this.state.teamIDActivated === team.id ? style.flexItemInnerActive : style.flexItemInnerInActive} onPress={() => this.showTeamDetail(team)}>
                                        <View style= {style.flexRow}>
                                          <Image style={{
                                            width: 50,
                                            height: 50,
                                            borderRadius: 25
                                          }}
                                            source={{
                                              uri: (team.teamPictureUrl) ? team.teamPictureUrl : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                            }} />
                                          <View style= {style.flexColumn}>
                                              <Text style={[style.teamInfo]}>
                                                {team.title}
                                              </Text>
                                              {partners.map(partner => {
                                                  return (
                                                    <Text style={[style.partnerName]} key={partner.id}>{partner.name}</Text>
                                                  );
                                                })
                                              }
                                          </View>

                                        </View>
                                      </TouchableHighlight>
                                  </Swipeable>
                                </View>
                            )}
                          </Mutation>
                        );
                      })
                    }
                  }}
                </Query>
                :
                <View></View>
                }
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
