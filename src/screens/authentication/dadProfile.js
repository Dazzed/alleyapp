import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Mutation } from "react-apollo";
import PhotoUpload from 'react-native-photo-upload';
import axios from 'axios';

import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';
import { EDIT_USER_MUTATION } from '../../graphql/mutation';

const DAD_NAME = 'Dad\'s Name*';
const DATE_OF_BIRTH = 'Date of Birth*';
const PHONE = 'Phone*';
const ADDRESS = 'Address*';
const INTERESTS = 'Interests';
const AFFILIATIONS = 'Affiliations';

export default class DadProfile extends Component {
  constructor() {
    super();
    this.state = {
      dad_name: '',
      dob: '',
      phone: '',
      address: '',
      interests: '',
      affiliations: '',
      error: false,
      errorMessage: '',
      profilePictureUrl: ''
    };
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'DAD PROFILE',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    },
    headerLeft: null
  });
  
  loadPicture = async avatar => {
    let data = await axios.post('https://x5wrp2wop7.execute-api.us-east-1.amazonaws.com/production/', {
      base64String: avatar
    });
    console.log(data);
    this.setState({
      profilePictureUrl: data.data.Location
    });
  }

  updateDad = async targetMutation => {
    try {
      const {
        dad_name,
        dob,
        phone,
        address,
        interests,
        affiliations,
        profilePictureUrl
      } = this.state;
      console.log(this.state);
      let name = dad_name;
      let dateOfBirth = dob;
      let id = await AsyncStorage.getItem('USER');

      const data = await targetMutation({ variables: { id, phone, name, dateOfBirth, address, interests, affiliations, profilePictureUrl } });
      console.log(data);
      this.props.navigation.navigate('daughterProfile')
    } catch (e) {
      console.log('Error in creating team', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  }

  render() {
    return (
      <Mutation mutation={EDIT_USER_MUTATION}>
        {(user_U) => (
          <KeyboardAvoidingView
            behavior="padding" style={style.container}>
            <ScrollView>
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
                <View style={style.formContainer}>
                  <FormLabel raised labelStyle={style.formLabel}>{DAD_NAME}</FormLabel>
                  <FormInput raised
                    onChangeText={value => {
                      this.setState({ dad_name: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{DATE_OF_BIRTH}</FormLabel>
                  <FormInput raised
                    onChangeText={value => {
                      this.setState({ dob: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{PHONE}</FormLabel>
                  <FormInput raised
                    onChangeText={value => {
                      this.setState({ phone: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{ADDRESS}</FormLabel>
                  <FormInput raised
                    onChangeText={value => {
                      this.setState({ address: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{INTERESTS}</FormLabel>
                  <FormInput raised
                    onChangeText={value => {
                      this.setState({ interests: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{AFFILIATIONS}</FormLabel>
                  <FormInput raised
                    onChangeText={value => {
                      this.setState({ affiliations: value });
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
                  onPress={this.updateDad.bind(this, user_U)}
                />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Mutation>
    );
  }
}
