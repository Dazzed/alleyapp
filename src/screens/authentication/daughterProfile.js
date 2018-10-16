import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import PhotoUpload from 'react-native-photo-upload';
import axios from 'axios';

import { Mutation } from "react-apollo";
import { DAUGHTER_CREATE_MUTATION, UPDATE_TEAM_MUTATION } from '../../graphql/mutation';
import DatePicker from 'react-native-datepicker'

import Color from 'constants/colors';
import style from 'styles/profile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const DAUGHTER_NAME = 'Daughter\'s Name*';
const DATE_OF_BIRTH = 'Date of Birth*';
const EMAIL = 'Email';
const PHONE = 'Phone';
const ADDRESS = 'Address';
const INTERESTS = 'Interests';
const AFFILIATIONS = 'Affiliations';

export default class DaughterProfile extends Component {
  constructor() {
    super();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.today = (month + '/' + date + '/' + year);
    this.state = {
      daughter_name: '',
      dob: '',
      email: '',
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
    title: 'DAUGHTER PROFILE',
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

    this.setState({
      profilePictureUrl: data.data.Location
    });
  }

  createDaughter = async (targetMutation1, targetMutation2) => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        daughter_name,
        dob,
        phone,
        address,
        interests,
        affiliations,
        email,
        profilePictureUrl
      } = this.state;

      if (daughter_name.trim() !== "" && dob.trim() !== '') {
        let isParent = false;

        let name = daughter_name;
        let dateOfBirth = dob;
        const data = await targetMutation1({ variables: { phone, name, dateOfBirth, address, interests, affiliations, email, profilePictureUrl, isParent } });
        console.log(88, data);


        let members =[];
        members.push( await AsyncStorage.getItem('USER'));
        let id = await AsyncStorage.getItem('ACTIVE_TEAM');

        members.push(data.data.user_C.user.id);

        const data2 = await targetMutation2({ variables: { id, members } });
        console.log(98, data2);
        let { screenProps: { signIn } } = this.props;
        signIn();
      } else {
        this.setState({
          error: true,
          errorMessage: "Please make sure all the required fields are filled"
        });
      }
    } catch (e) {
      console.log('Error in creating daughter', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      this.setState({
        error: true,
        errorMessage: e.message.replace("GraphQL error: ", "")
      });
    }
  }

  render() {
    return (
      <Mutation mutation={UPDATE_TEAM_MUTATION}>
        {(team_U) => (
          <Mutation mutation={DAUGHTER_CREATE_MUTATION}>
            {(user_C) => (
              <KeyboardAwareScrollView>
                <ScrollView keyboardShouldPersistTaps='handled'>
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
                      <FormLabel raised labelStyle={style.formLabel}>{DAUGHTER_NAME}</FormLabel>
                      <FormInput raised
                        onChangeText={value => {
                          this.setState({ daughter_name: value });
                        }}
                      />
                      <FormLabel raised labelStyle={style.formLabel}>{DATE_OF_BIRTH}</FormLabel>
                      <DatePicker
                        style={{ width: '100%' }}
                        date={this.state.dob}
                        mode="date"
                        showIcon={false}
                        placeholder=" "
                        format="MM/DD/YYYY"
                        minDate="01/01/1900"
                        maxDate={this.today}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            borderWidth: 0,
                            justifyContent: 'flex-start',
                            alignItems: 'flex-start',
                            paddingTop: 10,
                            marginLeft: 20,
                            marginRight: 20,
                            borderWidth: 0,
                            borderBottomWidth: 1,
                            borderBottomColor: "#BBBBBB",
                            width: '100%',
                          },
                          dateText: {
                            fontSize: 14,
                            color: '#888'
                          }
                        }}
                        onDateChange={(date) => { this.setState({ dob: date }) }}
                      />
                      <FormLabel raised labelStyle={style.formLabel}>{EMAIL}</FormLabel>
                      <FormInput raised
                        onChangeText={value => {
                          this.setState({ email: value });
                        }}
                      />
                      <FormLabel raised labelStyle={style.formLabel}>{PHONE}</FormLabel>
                      <FormInput raised
                        maxLength={10}
                        keyboardType="phone-pad"
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
                      title={'Save'}
                      borderRadius={5}
                      backgroundColor={Color.blue}
                      textStyle={{ fontWeight: 'bold' }}
                      style={style.button}
                      onPress={this.createDaughter.bind(this, user_C, team_U)}
                    />
                  </View>
                </ScrollView>
              </KeyboardAwareScrollView>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
