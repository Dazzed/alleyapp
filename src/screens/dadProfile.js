import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const DAD_NAME = 'Dad\'s Name';
const DATE_OF_BIRTH = 'Date of Birth';
const EMAIL = 'Email';
const PHONE = 'Phone';
const ADDRESS = 'Address';
const INTERESTS = 'Interests';
const AFFILIATIONS = 'Affiliations';

export default class DadProfile extends Component {
  constructor() {
    super();
    this.state = {
      dad_name: '',
      dob: '',
      email: '',
      phone: '',
      address: '',
      interests: '',
      affiliations: ''
    };
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Dad Profile',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  render() {
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
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
            <FormLabel raised labelStyle={style.formLabel}>{EMAIL}</FormLabel>
            <FormInput raised
              onChangeText={value => {
                this.setState({ email: value });
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
          </View>
          <Button raised
            title={'Save'}
            borderRadius={5}
            backgroundColor={Color.blue}
            textStyle={{ fontWeight: 'bold' }}
            style={style.button}
            onPress={() => {
              this.props.navigation.navigate('dashboard')
            }}
          />
        </View>
      </View>
    );
  }
}
