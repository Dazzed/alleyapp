import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";
import { DAUGHTER_CREATE_MUTATION, UPDATE_TEAM_MUTATION } from '../../graphql/mutation';

import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const DAUGHTER_NAME = 'Daughter\'s Name';
const DATE_OF_BIRTH = 'Date of Birth';
const EMAIL = 'Email';
const PHONE = 'Phone';
const ADDRESS = 'Address';
const INTERESTS = 'Interests';
const AFFILIATIONS = 'Affiliations';

export default class DaughterProfile extends Component {
  constructor() {
    super();
    this.state = {
      daughter_name: '',
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

  createDaughter = async (targetMutation1, targetMutation2) => {
    try {
      const {
        daughter_name,
        dob,
        phone,
        address,
        interests,
        affiliations,
        email
      } = this.state;
      console.log(this.state);
      let name = daughter_name;
      let dateOfBirth = dob;
      const data = await targetMutation1({ variables: { phone, name, dateOfBirth, address, interests, affiliations, email } });

      console.log(data);
      let members =[];
      members.push( await AsyncStorage.getItem('USER'));
      let id = await AsyncStorage.getItem('ACTIVE_TEAM');
      console.log(id);
      members.push(data.data.user_C);
      console.log(64, members);
      const data2 = await targetMutation2({ variables: { id, members } });
      console.log(data2);
      this.props.navigation.navigate('signin')
    } catch (e) {
      console.log('Error in creating daughter', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
  }

  render() {
    return (
      <Mutation mutation={UPDATE_TEAM_MUTATION}>
        {(team_U) => (
          <Mutation mutation={DAUGHTER_CREATE_MUTATION}>
            {(user_C) => (
              <View style={style.container}>
                <View style={style.subContainer}>
                  <View style={style.formContainer}>
                    <Text h2>Daughter's Profile</Text>
                    <FormLabel raised labelStyle={style.formLabel}>{DAUGHTER_NAME}</FormLabel>
                    <FormInput raised
                      onChangeText={value => {
                        this.setState({ daughter_name: value });
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
              </View>
            )}
          </Mutation>
        )}
      </Mutation>
    );
  }
}
