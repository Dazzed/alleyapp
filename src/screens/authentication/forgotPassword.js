import React, { Component } from 'react';
import { View, Image, TouchableHighlight, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Mutation } from "react-apollo";
import { FORGOT_PASSWORD_MUTATION } from '../../graphql/mutation';

import Color from 'constants/colors';
import style from 'styles/signin';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

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
  }

  render() {
    return (
      <Mutation mutation={FORGOT_PASSWORD_MUTATION}>
        {(user_Forget_Password) => (
          <KeyboardAvoidingView
            behavior="padding" style={style.container}>
            <ScrollView>
            <View style={style.subContainer}>
              <View style={style.welcomeContainer}>
                <Image
                  source={require('../../assets/images/alley-oop.png')}
                  style={style.logoName}
                />
                <Text style={style.subTitle}>Deepending inter-gernerational relationships through play - Forgot</Text>
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
                {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
              </View>
              <Button raised
                title={'RESET PASSWORD'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={this.forgotPassword.bind(this, user_Forget_Password) }
              />
              <TouchableHighlight onPress={() => this.props.navigation.goBack()}><Text style={style.forgotPassword}>Already have an account? Log In</Text></TouchableHighlight>
            </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )}
      </Mutation>
    );
  }
}
