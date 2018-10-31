import React, { Component } from 'react';
import { View, Image, TouchableHighlight, TextInput, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Mutation } from "react-apollo";
import { FORGOT_PASSWORD_MUTATION } from '../../graphql/mutation';

import Color from 'constants/colors';
import style from 'styles/signin';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const EMAIL = 'Email';

export default class ForgotPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      error: false,
      errorMessage: ''
    };
  }
  static navigationOptions = {
    header: null
  };

  forgotPassword = async targetMutation => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        email
      } = this.state;

      const data = await targetMutation({ variables: { email } });
      this.props.navigation.navigate('signin');
    } catch (e) {
      console.log('Error in forgotPassword', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
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
      <Mutation mutation={FORGOT_PASSWORD_MUTATION}>
        {(user_Forget_Password) => (
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
                <Text style={style.subTitle}>Enter your email address to recover your password</Text>
            </View>
            <TextInput style={style.inputEmail}
              placeholder={"Email"}
              underlineColorAndroid='transparent'
              selectionColor={'#D5D5D5'}
              returnKeyType = {'done'}
              keyboardType = {'email-address'}
              autoCapitalize = 'none'
              onChangeText={value => {
                this.setState({ email: value });
              }}/>

            <TouchableHighlight style={style.touchableStyleRecover} onPress={this.forgotPassword.bind(this, user_Forget_Password) }>
              <Text style={style.signupText1}>Recover</Text>
            </TouchableHighlight>
          </View>
          </KeyboardAwareScrollView>
        )}
      </Mutation>
    );
  }
}
