import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'space-between',
  },
  back: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  welcomeContainer: {
    marginLeft: 25,
    marginRight:25,
    justifyContent: 'center',
    alignItems:'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.black,
    textAlign: 'center'
  },
  logoName: {
    width: '80%',
  },
  logoImg: {
    width: '30%',
  },
  subTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Color.black,
    textAlign: 'center',
    margin: 10
  },
  forgotPassword: {
    textAlign: 'center',
    margin: 10,
    fontSize: 12,
    color: Color.darkBlue,
    fontWeight: 'bold'
  },
  button: {
    margin: 10,
  },

  buttonRegistration: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 100,
  },

  footerText: {
    textAlign: 'center',
    margin: 25,
    fontSize: 10,
    lineHeight: 16,
    color: Color.darkBlue
  },
  formContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  formLabel: {
    color: Color.black
  },
  tos: {
    fontSize: 10
  },
  tosText: {
    textAlign: 'center',
    margin: 10,
    fontSize: 12,
    lineHeight: 16,
    color: Color.black
  },
  touchHighlight: {
    marginLeft: 5
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    margin: 15
  }
});
