import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Mutation } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/signin';

import { FormLabel, FormInput, Button } from 'react-native-elements';

import { REGISTER_MUTATION } from '../../graphql/mutation';
import { setToken, setUserInfo, setUser, getUser, getActiveTeam, setActiveTeam } from '../../utils/util';
const EMAIL = 'Email';
const PASSWORD = 'Password';
const CONFIRM_PASSWORD = 'Confirm Password';

export default class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      error: false,
      errorMessage: ''
    };
  }
  static navigationOptions = {
    header: null
  };

  register = async targetMutation => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        email,
        password,
        confirm_password
      } = this.state;

      if (email.trim() !== "" && password.trim() !== "" && confirm_password.trim() !== "") {
        let is_parent = true;
        if (password == confirm_password) {
          const data = await targetMutation({ variables: { email, password, is_parent } });
          console.log(47,JSON.stringify(data))

          setToken(data.data.user_C.token);
          setUserInfo(JSON.stringify(data.data.user_C.user));
          setUser(data.data.user_C.user.id);
          
          this.props.navigation.navigate('teamProfile');
        } else {
          this.setState({
            error: true,
            errorMessage: "Password mismatch"
          });
        }
      } else {
        this.setState({
          error: true,
          errorMessage: "Please enter all the fields"
        });
      }
    } catch (e) {
      console.log('Error in signIn', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      this.setState({
        error: true,
        errorMessage: e.message.replace("GraphQL error: ", "")
      });
    }
  }


  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION}>
        {(user_C) => (
          <KeyboardAvoidingView
            behavior="padding" style={style.container}>
            <ScrollView>
              <View style={style.subContainer}>
                <View style={style.welcomeContainer}>
                  <Image
                    source={require('../../assets/images/alley-oop.png')}
                    style={style.logoName}
                  />
                  <Text style={style.subTitle}>Deepening inter-generational relationships through play</Text>
                  <Image
                    source={require('../../assets/images/alley-oop-logo.png')}
                    style={style.logoImg}
                  />
                </View>
                <View style={style.formContainer}>
                  <FormLabel raised labelStyle={style.formLabel}>{EMAIL}</FormLabel>
                  <FormInput raised
                    autoCapitalize="none"
                    onChangeText={value => {
                      this.setState({ email: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{PASSWORD}</FormLabel>
                  <FormInput raised
                    secureTextEntry={true}
                    onChangeText={value => {
                      this.setState({ password: value });
                    }}
                  />
                  <FormLabel raised labelStyle={style.formLabel}>{CONFIRM_PASSWORD}</FormLabel>
                  <FormInput raised
                    secureTextEntry={true}
                    onChangeText={value => {
                      this.setState({ confirm_password: value });
                    }}
                  />
                  {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
                </View>
                <Button raised
                  title={'Register'}
                  borderRadius={5}
                  backgroundColor={Color.blue}
                  textStyle={{ fontWeight: 'bold' }}
                  style={style.button}
                  onPress={this.register.bind(this, user_C)}

                />
                <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Text style={style.forgotPassword}>Already have an account? Log In</Text></TouchableHighlight>
                <Text style={style.footerText}>By creating an account you agree to our{'\n'} <Text style={style.tos} onPress={() => this.props.navigation.navigate('tos')}>Terms of Service</Text> and <Text onPress={() => this.props.navigation.navigate('privacyPolicy')} style={style.tos}>Privacy Policy</Text>
                </Text>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Mutation>
    );
  }
}
