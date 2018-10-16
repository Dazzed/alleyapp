import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Mutation, Query } from "react-apollo";
import PhotoUpload from 'react-native-photo-upload';
import axios from 'axios';
import DatePicker from 'react-native-datepicker'

import Color from 'constants/colors';
import style from 'styles/profile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';
import { EDIT_USER_MUTATION } from '../graphql/mutation';
import { GET_USER } from '../graphql/queries';
import { setUser } from '../utils/util';

const DAD_NAME = 'Dad\'s Name*';
const DATE_OF_BIRTH = 'Date of Birth*';
const PHONE = 'Phone*';
const ADDRESS = 'Address*';
const INTERESTS = 'Interests';
const AFFILIATIONS = 'Affiliations';

export default class DadProfile extends Component {
  constructor() {
    super();
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    this.today = (month + '/' + date + '/' + year);
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
  });

  loadPicture = async avatar => {
    let data = await axios.post('https://x5wrp2wop7.execute-api.us-east-1.amazonaws.com/production/', {
      base64String: avatar
    });

    this.setState({
      profilePictureUrl: data.data.Location
    });
  }

  setUser = user => {
    if (this.state.dad_name === '') {
      this.setState({
        dad_name: user.name,
        phone: user.phone,
        dob: user.dateOfBirth,
        address: user.address,
        interests: user.interests,
        affiliations: user.affiliations,
        profilePictureUrl: user.profilePictureUrl
      });
    }
  }
  updateDad = async targetMutation => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        dad_name,
        dob,
        phone,
        address,
        interests,
        affiliations,
        profilePictureUrl
      } = this.state;

      if (dad_name.trim() !== "" && phone.trim() !== "" && address.trim() !== "") {
        let name = dad_name;
        let dateOfBirth = dob;
        let id = await AsyncStorage.getItem('USER');
        let isParent = true;
        const data = await targetMutation({ variables: { id, phone, name, dateOfBirth, address, interests, affiliations, profilePictureUrl, isParent } });
        this.props.navigation.goBack();
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

  onChange = (event, field) => {
    const { text } = event.nativeEvent;
    this.setState({
      [field]: text
    });
  }

  render() {
    const id = this.props.navigation.state.params.id;
    return (
      <Mutation mutation={EDIT_USER_MUTATION}>
        {(user_U) => (
          <KeyboardAwareScrollView>
            <ScrollView keyboardShouldPersistTaps='handled'>
              <Query query={GET_USER} variables={{ id }} fetchPolicy="network-only">
                {({ data: { user_R }, loading }) => {
                  if (loading || !user_R) {
                    return <Text>Loading ...</Text>;
                  }
                  {
                    this.setUser(user_R);
                    return (
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
                                uri: (user_R.profilePictureUrl) ? user_R.profilePictureUrl : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
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
                            value={user_R.name}
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
                          <FormLabel raised labelStyle={style.formLabel}>{PHONE}</FormLabel>
                          <FormInput raised
                            maxLength={10}
                            keyboardType="phone-pad"
                            onChangeText={value => {
                              this.setState({ phone: value });
                            }}
                            value={user_R.phone}
                          />
                          <FormLabel raised labelStyle={style.formLabel}>{ADDRESS}</FormLabel>
                          <FormInput raised
                            onChangeText={value => {
                              this.setState({ address: value });
                            }}
                            value={user_R.address}
                          />
                          <FormLabel raised labelStyle={style.formLabel}>{INTERESTS}</FormLabel>
                          <FormInput raised
                            onChangeText={value => {
                              this.setState({ interests: value });
                            }}
                            value={user_R.interests}
                          />
                          <FormLabel raised labelStyle={style.formLabel}>{AFFILIATIONS}</FormLabel>
                          <FormInput raised
                            onChangeText={value => {
                              this.setState({ affiliations: value });
                            }}
                            value={user_R.affiliations}
                          />
                          {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
                        </View>
                        <Button raised
                          title={'Update'}
                          borderRadius={5}
                          backgroundColor={Color.blue}
                          textStyle={{ fontWeight: 'bold' }}
                          style={style.button}
                          onPress={this.updateDad.bind(this, user_U)}
                        />
                      </View>
                    );
                  }
                }}
              </Query>
            </ScrollView>
          </KeyboardAwareScrollView>
        )}
      </Mutation>
    );
  }
}
