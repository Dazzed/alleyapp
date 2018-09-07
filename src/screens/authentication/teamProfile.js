import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";
import PhotoUpload from 'react-native-photo-upload';
import axios from 'axios';
import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const TEAM_NAME = 'Team Name*';

import { TEAM_MUTATION } from '../../graphql/mutation';
import { getUser } from '../../utils/util';

export default class TeamProfile extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      error: false,
      errorMessage: '',
      teamPictureUrl: ''
    };
  }

  formatDate() {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  createTeam = async targetMutation => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        title,
        teamPictureUrl
      } = this.state;


      if (title.trim() !== "" ) {
        let member = [];
        member.push(await AsyncStorage.getItem('USER'));

        const data = await targetMutation({ variables: { title, member, teamPictureUrl } });

        AsyncStorage.setItem('ACTIVE_TEAM', data.data.team_C);
        this.props.navigation.navigate('dadProfile');
      } else {
        this.setState({
          error: true,
          errorMessage: "Please make sure all the required fields are filled"
        });
      }
    } catch (e) {
      console.log('Error in creating team', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      this.setState({
        error: true,
        errorMessage: e.message.replace("GraphQL error: ", "")
      });
    }
  }

  loadPicture = async avatar => {
    let data = await axios.post('https://x5wrp2wop7.execute-api.us-east-1.amazonaws.com/production/', {
      base64String: avatar
    });

    this.setState({
      teamPictureUrl: data.data.Location
    });
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'TEAM PROFILE',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    },
    headerLeft: null
  });


  render() {
    return (
      <Mutation mutation={TEAM_MUTATION}>
        {(team_C) => (
          <View style={style.container}>
            <View style={style.subContainer}>
              <View style={style.photoContainer}>
                <PhotoUpload containerStyle={{ height: 150 }}
                  onPhotoSelect={avatar => {
                    if (avatar) {
                      this.loadPicture(avatar)
                    }
                  }}
                >
                  <Image
                    style={{
                      paddingVertical: 30,
                      width: 150,
                      height: 150,
                      borderRadius: 75
                    }}
                    resizeMode='cover'
                    source={{
                      uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                    }}
                  />
                </PhotoUpload>
              </View>
              <View style={style.spaceFormContainer}>                
                <FormLabel raised labelStyle={style.formLabel}>{TEAM_NAME}</FormLabel>
                <FormInput raised
                  onChangeText={value => {
                    this.setState({ title: value });
                  }}
                />
                {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
              </View>
              <Button raised
                title={'Next'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={this.createTeam.bind(this, team_C)}
              />
            </View>
          </View>
        )}
      </Mutation>
    );
  }
}
