import React, { Component,  } from 'react';
import { View, TouchableHighlight, AsyncStorage, Image, ScrollView } from 'react-native';
import { GET_USER, GET_TEAMS } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';
import styles from 'styles/help';

import { Text, Icon } from 'react-native-elements';


export default class DadTeams extends Component {
  constructor() {
    super();
    this.state = {
      member: null,
      uniqueKey: 1
    };
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'TEAMS',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    },
    headerLeft: null
  });

  showDadInfo = () => {
    this.props.navigation.navigate('dadProfile', {
      id: this.state.member.id
    });
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
    let user = await AsyncStorage.getItem('USER_INFO');

    let user_info = JSON.parse(user);

    this.setState({
      member: user_info
    })
  }
  render() {
    return (
      <ScrollView>
        <View style={style.container}>
          <View style={style.subContainer}>
            <View style={style.formContainer}>
            {(this.state.member) ?
              <Query query={GET_USER} variables={{ id: this.state.member.id }} fetchPolicy="network-only">
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
                            uri: user_R.profilePictureUrl
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
                {this.state.member ?
                  <Query query={GET_TEAMS} variables={{ memberId: this.state.member.id }} fetchPolicy="network-only">
                    {({ data: { teamByMember }, loading }) => {
                      if (loading || !teamByMember) {
                      return <Text>Loading ...</Text>;
                    }
                    {
                      return teamByMember.map(team => {
                        let partners = team.members.filter(member_user => {
                          return member_user.id !== this.state.member.id
                        })
                        return (
                          <View style={style.flexItem} key={team.id}>
                            <TouchableHighlight style={style.flexItemInner} onPress={() => this.showTeamDetail(team)}>
                              <View>
                                <Image style={{
                                  width: 50,
                                  height: 50,
                                  borderRadius: 25
                                }}
                                  source={{
                                    uri: (team.teamPictureUrl) ? team.teamPictureUrl : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                  }} />
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
                            </TouchableHighlight>
                          </View>
                        );
                      })
                    }
                  }}
                </Query>
                :
                <View></View>
                }
                <View style={style.flexItem}>
                  <TouchableHighlight style={style.flexItemInner} onPress={() => this.props.navigation.navigate('newTeam')}>
                    <View style={style.flexItemInner}>
                      <Image style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                      }}
                        source={require('../assets/images/add_team.png')} />
                      <Text style={[style.teamInfo]}>
                        Add New Team
                      </Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
