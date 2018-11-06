import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/signin';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LOGIN_MUTATION } from '../../graphql/mutation';
import { setToken, setUserInfo, setUser, getUser, getActiveTeam, setActiveTeam } from '../../utils/util';
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

  componentDidMount(){
    AsyncStorage.getItem('IS_LOGIN').then((value) => {
        if(value === 'true'){
          AsyncStorage.setItem('IS_TIMER_RESET', 'false');
          let { screenProps: { signIn } } = this.props;
          signIn();
        }
    });
  }

  signIn = async targetMutation => {
    try {
      this.setState({
        error: false,
        errorMessage: ''
      });
      const {
        email,
        password
      } = this.state;

      if (email.trim() !== '' && password.trim() !== '') {
        const data = await targetMutation({ variables: { email, password } });

        setToken(data.data.user_Login.token);
        setUserInfo(JSON.stringify(data.data.user_Login.user));
        setUser(data.data.user_Login.user.id);
        let activeTeam = await AsyncStorage.getItem('ACTIVE_TEAM');
        if (!activeTeam) {
          if (data.data.user_Login.teams.length > 0) {
            setActiveTeam(data.data.user_Login.teams[0].id);
          }
        }
        AsyncStorage.setItem('ACTIVE_TEAM', data.data.user_Login.teams[0].id);
        AsyncStorage.setItem('IS_TIMER_RESET', 'true');
        let { screenProps: { signIn } } = this.props;
        signIn();
      } else {
        this.setState({
          error: true,
          errorMessage: "Please enter your username and password"
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
      <Mutation mutation={LOGIN_MUTATION}>
        {(user_Login) => (
          <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
          <View style={style.subContainer}>
            <View style={style.welcomeContainer}>
                <Image resizeMode="contain"
                  source={require('../../assets/images/alley-oop-logo.png')}
                  style={style.logoImg}
                />
                <Image resizeMode="contain"
                  source={require('../../assets/images/alley-oop.png')}
                  style={style.logoName}
                />
                <Text style={style.subTitle}>Deepening inter-generational relationships through play</Text>
            </View>
            <TextInput style={style.inputEmail}
              placeholder={"Email"}
              placeholderTextColor='rgba(72,65,65,0.18)'
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
              placeholderTextColor='rgba(72,65,65,0.18)'
              underlineColorAndroid='transparent'
              selectionColor={'#D5D5D5'}
              returnKeyType = {'done'}
              keyboardType = {'default'}
              ref={(input) => { this.Password = input; }}
              autoCapitalize = 'none'
              onChangeText={value => {
                this.setState({ password: value });
              }}
              secureTextEntry={true}/>
            <View>
                <TouchableHighlight style={style.touchableStyleFP} onPress={() => this.props.navigation.navigate('forgotPassword')}>
                  <Text style={style.forgotPassword}>Forgot password?</Text>
                </TouchableHighlight>
            </View>
            <TouchableHighlight style={style.touchableStyleLogin} onPress={this.signIn.bind(this, user_Login)}>
              <Text style={style.loginText}>Log in</Text>
            </TouchableHighlight>
            <Text style={style.signupText}>Don't have an account? <Text style={style.signup} onPress={() => this.props.navigation.navigate('register')}>Sign up</Text></Text>
          </View>
          <Text style={style.footerText}>By creating an account you agree to our{'\n'} <Text style={style.tos} onPress={() => this.props.navigation.navigate('tos')}>Terms of Service</Text> and <Text onPress={() => this.props.navigation.navigate('privacyPolicy')} style={style.tos}>Privacy Policy</Text></Text>
          </KeyboardAwareScrollView>
        )}
      </Mutation>
    );
  }
}
