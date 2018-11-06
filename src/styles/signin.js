import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  keyboard: {
    flex: 1,
    backgroundColor: Color.white,
  },

  container: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'space-between',
  },

  welcomeContainer: {
    marginLeft: 25,
    marginRight:25,
    justifyContent: 'center',
    alignItems:'center'
  },

  welcomeContainer0: {
    justifyContent: 'center',
    alignItems:'center'
  },

  logoImg: {
    width: 50,
    height: 40,
    marginTop: 65,
  },

  logoImg0: {
    width: 60,
    height: 50,
    marginTop: 40,
  },

  logoImg1: {
    width: 80,
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  logoBackImg: {
    width: 15,
    height: 20,
    padding:10,
    marginLeft:5,
    marginTop: 35,
  },

  logoName: {
    width: 150,
    height: 40,
    marginTop: 20,
  },

  logoName0: {
    width: "80%",
    height: 75,
    marginTop: 40,
  },

  subTitle: {
    fontSize: 19,
    fontWeight: 'normal',
    color: '#1365A7',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
  },

  inputEmail: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 25,
    marginRight: 25,
    marginTop:25,
    borderBottomWidth: 1,
    color: 'rgba(72,65,65,0.18)',
    borderBottomColor: 'rgba(213,213,213,0.27)',
  },

  inputPassword: {
    height: 50,
    fontSize: 15,
    backgroundColor: '#ffffff',
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 25,
    marginRight: 25,
    marginTop:15,
    borderBottomWidth: 1,
    color: 'rgba(72,65,65,0.18)',
    borderBottomColor: 'rgba(213,213,213,0.27)',
  },

  touchableStyleFP: {
    marginRight: 15,
    alignSelf: 'flex-end',
  },

  forgotPassword: {
    textAlign: 'center',
    margin: 8,
    fontSize: 13,
    color: 'rgba(155,155,155,0.33)',
    fontWeight: 'normal'
  },


  signupText: {
    textAlign: 'center',
    margin: 25,
    fontSize: 15,
    lineHeight: 16,
    color: '#C1C1C1',
  },

  signup: {
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    color: '#C1C1C1'
  },

  footerText: {
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    fontSize: 12,
    lineHeight: 16,
    color: '#C1C1C1',
  },

  tos: {
    fontSize: 12
  },

  touchableStyleLogin: {
    width: "45%",
    backgroundColor: '#4A035E',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 50,
    padding:12,
  },

  touchableStyleSignup: {
    width: "45%",
    backgroundColor: '#4A035E',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 30,
    borderRadius: 50,
    padding:12,
  },

  touchableStyleRecover: {
    width: "45%",
    backgroundColor: '#4A035E',
    alignSelf: 'center',
    marginTop: 100,
    borderRadius: 50,
    padding:12,
  },

  signupText1: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding:5,
  },

  loginText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding:5,
  },

  termsBox: {
    backgroundColor: 'white',
    width: '80%',
    height:350,
    marginTop: 25,
    alignSelf: 'center',
    borderRadius: 5,
    shadowColor: 'rgba(0,0,0,0.18)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    position: 'relative'
  },

crossIconOpacity: {
  position: 'absolute',
  right:-8,
  top:-15,
  backgroundColor: 'white',
  zIndex: 99,
},

text40: {
  fontSize: 40,
  fontWeight: 'normal',
  color: '#310B3E',
  textAlign: 'center',
},

text14: {
  fontSize: 14,
  fontWeight: 'normal',
  color: '#0D0760',
  textAlign: 'center',
  marginTop: 15,
},

});
