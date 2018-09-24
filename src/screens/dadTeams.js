import React, { Component,  } from 'react';
import { View, TouchableHighlight, AsyncStorage, Image, ScrollView} from 'react-native';
import { GET_USER, GET_TEAMS } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';
import styles from 'styles/help';

import { Text, Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';


export default class DadTeams extends Component {

  rightButtons = [
    <TouchableHighlight style = {style.swipeViewOption1} onPress={() => this.actionSwipeOption1()}><Text style = {{color: 'white', textAlign:'center',}}>Make team Active</Text></TouchableHighlight>,
    <TouchableHighlight style = {style.swipeViewOption2} onPress={() => this.actionSwipeOption2()}><Text style = {{color: 'white',textAlign:'center',}}>Delete Team</Text></TouchableHighlight>
  ];

  swipeable = null;

  handleUserBeganScrollingParentView() {
    this.swipeable.recenter();
  }


  constructor() {
    super();
    this.state = {
      member: '',
      uniqueKey: 1,
      isSwiping: false,
      isCloseSwipe: false,
      show_something: false,
    };
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

  showDadInfo = () => {
    this.props.navigation.navigate('dadProfile', {
      id: this.state.member
    });
  }

  actionSwipeOption1 = () => {
    alert('Button1 Click');
  }

  actionSwipeOption2 = () => {
    alert('Button2 Click');
  }

  clickAddTeam = () => {
    this.props.navigation.navigate('newTeam');
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
    return (
      <ScrollView scrollEnabled={!this.state.isSwiping}>
        <View style={style.container}>
          <View style={style.subContainer}>
            <View >
            {(this.state.member != '') ?
              <Query query={GET_USER} variables={{ id: this.state.member }} fetchPolicy="network-only">
                {({ data: { user_R }, loading }) => {
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
                    {({ data: { teamByMember }, loading }) => {
                      if (loading || !teamByMember) {
                      return <Text>Loading ...</Text>;
                    }
                    {
                      return teamByMember.map(team => {
                        let partners = team.members.filter(member_user => {
                          return member_user.id !== this.state.member
                        })
                        return (
                              <View style={style.flexItem1} key={team.id}>
                              <Swipeable
                                  onRef={ref => this.swipeable = ref}
                                  onSwipeStart={() => this.setState({isSwiping: true})}
                                  onSwipeRelease={() => this.setState({isSwiping: false})}
                                  closeOnRowPress = {this.state.isCloseSwipe}
                                  rightButtons = {this.rightButtons}>

                                  <TouchableHighlight style={style.flexItemInner1} onPress={() => this.showTeamDetail(team)}>
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
