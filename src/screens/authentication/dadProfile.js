import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';
import { EDIT_USER_MUTATION } from '../../graphql/mutation';

const DAD_NAME = 'Dad\'s Name';
const DATE_OF_BIRTH = 'Date of Birth';
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
      phone: '',
      address: '',
      interests: '',
      affiliations: '',
      error: false,
      errorMessage: ''
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

  updateDad = async targetMutation => {
    try {
      const {
        dad_name,
        dob,
        phone,
        address,
        interests,
        affiliations
      } = this.state;
      console.log(this.state);
      let name = dad_name;
      let dateOfBirth = dob;
      let id = await AsyncStorage.getItem('USER');

      const data = await targetMutation({ variables: { id, phone, name, dateOfBirth, address, interests, affiliations } });
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
          <View style={style.container}>
            <View style={style.subContainer}>
              <View style={style.formContainer}>
                <Text h2>Dad's Profile</Text>
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
          </View>
        )}
      </Mutation>
    );
  }
}
