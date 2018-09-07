import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";
import PhotoUpload from 'react-native-photo-upload';
import axios from 'axios';
import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const TEAM_NAME = 'Team Name';

import { UPDATE_TEAM_INFO_MUTATION } from '../graphql/mutation';

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
  
  updateTeam = async targetMutation => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        title,
        teamPictureUrl
      } = this.state;

      if (title.trim() !== "") {
        let members = [];
        let id = this.props.navigation.state.params.id
        members.push(await AsyncStorage.getItem('USER'));
        members.push(this.props.navigation.state.params.daughter)

        const data = await targetMutation({ variables: { 
          id,
          title, 
          members, 
          teamPictureUrl
         } });
        AsyncStorage.setItem('ACTIVE_TEAM', id);
        this.props.navigation.navigate('dadTeams');
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

  componentDidMount() {
    this.setState({
      teamPictureUrl: this.props.navigation.state.params.teamPictureUrl,
      title: this.props.navigation.state.params.title
    })
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'TEAM PROFILE',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    },
  });


  render() {
    return (
      <Mutation mutation={UPDATE_TEAM_INFO_MUTATION}>
        {(team_U) => (
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
                      uri: (this.props.navigation.state.params.teamPictureUrl) ? this.props.navigation.state.params.teamPictureUrl : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
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
                  value={this.props.navigation.state.params.title}
                />
                {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
              </View>
              <Button raised
                title={'Update'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={this.updateTeam.bind(this, team_U)}
              />
              <Button raised
                title={'Update Daughter'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={() => this.props.navigation.navigate('daughterProfile', {
                  id: this.props.navigation.state.params.daughter,
                  team_id: this.props.navigation.state.params.id
                })}
              />
            </View>
          </View>
        )}
      </Mutation>
    );
  }
}
