import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, TextInput , ScrollView, KeyboardAvoidingView } from 'react-native';
import { Mutation } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/signin';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

    if(this.state.error){
        alert(this.state.errorMessage);
    }

  }


  render() {
    return (
      <Mutation mutation={REGISTER_MUTATION}>
        {(user_C) => (
          <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
          <View style={style.subContainer}>
          <TouchableHighlight onPress={() => this.props.navigation.goBack()}>
              <Image resizeMode="contain"
                source={require('../../assets/images/back_icon.png')}
                style={style.logoBackImg}
              />
          </TouchableHighlight>
            <View style={style.welcomeContainer}>
                <Image resizeMode="contain"
                  source={require('../../assets/images/alley-oop-logo.png')}
                  style={style.logoImg0}
                />
                <Image resizeMode="contain"
                  source={require('../../assets/images/alley-oop.png')}
                  style={style.logoName}
                />
                <Text style={style.subTitle}>Welcome to alley-oop! Please sign up to continue</Text>
            </View>
            <TextInput style={style.inputEmail}
              placeholder={"Email"}
              underlineColorAndroid='transparent'
              selectionColor={'#D5D5D5'}
              returnKeyType = {'next'}
              onSubmitEditing={() => { this.Password.focus();}}
              keyboardType = {'email-address'}
              autoCapitalize = 'none'
              onChangeText={value => {
                this.setState({ email: value });
              }}/>

            <TextInput style={style.inputPassword}
              placeholder={"Password"}
              underlineColorAndroid='transparent'
              selectionColor={'#D5D5D5'}
              returnKeyType = {'next'}
              keyboardType = {'default'}
              onSubmitEditing={() => { this.ConfirmPassword.focus();}}
              ref={(input) => { this.Password = input; }}
              autoCapitalize = 'none'
              onChangeText={value => {
                this.setState({ password: value });
              }}
              secureTextEntry={true}/>

              <TextInput style={style.inputPassword}
                placeholder={"Confirm Password"}
                underlineColorAndroid='transparent'
                selectionColor={'#D5D5D5'}
                returnKeyType = {'done'}
                keyboardType = {'default'}
                ref={(input) => { this.ConfirmPassword = input; }}
                autoCapitalize = 'none'
                onChangeText={value => {
                  this.setState({ confirm_password: value });
                }}
                secureTextEntry={true}/>

            <TouchableHighlight style={style.touchableStyleSignup} onPress={this.register.bind(this, user_C)} >
              <Text style={style.signupText1}>Sign up</Text>
            </TouchableHighlight>
          </View>
          <Text style={style.footerText}>By creating an account you agree to our{'\n'} <Text style={style.tos} onPress={() => this.props.navigation.navigate('tos')}>Terms of Service</Text> and <Text onPress={() => this.props.navigation.navigate('privacyPolicy')} style={style.tos}>Privacy Policy</Text></Text>
          </KeyboardAwareScrollView>
        )}
      </Mutation>
    );
  }
}
