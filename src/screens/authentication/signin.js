import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Mutation } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/signin';

import { FormLabel, FormInput, Button } from 'react-native-elements';

import { LOGIN_MUTATION } from '../../graphql/mutation';
import { setToken, setUserInfo, setUser } from '../../utils/util';
const EMAIL = 'Email';
const PASSWORD = 'Password';

export default class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: false,
      errorMessage: ''
    };
  }
  static navigationOptions = {
    header: null
  };
  
  signIn = async targetMutation => {
    try {
      const {
        email,
        password
      } = this.state;
      const data = await targetMutation({ variables: { email, password } });
      console.log(data);
      setToken(data.data.user_Login.token);
      setUserInfo(JSON.stringify(data.data.user_Login.user));
      setUser(data.data.user_Login.user.id);
      
      let { screenProps: { signIn } } = this.props;
      signIn();
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
      <Mutation mutation={LOGIN_MUTATION}>
        {(user_Login) => (
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
                {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
              </View>
              <Button raised
                title={'Login'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={this.signIn.bind(this, user_Login)}
              />
              <Button raised
                title={'Register'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={() => {
                  this.props.navigation.navigate('register')
                }}
              />
              <TouchableHighlight onPress={() => this.props.navigation.navigate('forgotPassword')}><Text style={style.forgotPassword}>Forgot password?</Text></TouchableHighlight>
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
