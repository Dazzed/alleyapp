import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'space-between'
  },
  photoContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: Color.white,
    height: 160,
    justifyContent: 'space-between'
  },
  back: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  welcomeContainer: {
    margin: 25
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Color.black,
    textAlign: 'center'
  },
  logoName: {
    width: '100%',
  },
  logoImg: {
    width: '22%',
    marginLeft: '39%'
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
    margin: 10
  },
  footerText: {
    textAlign: 'center',
    margin: 25,
    fontSize: 10,
    lineHeight: 16,
    color: Color.darkBlue
  },
  spaceFormContainer: {
    margin: 10,
    marginTop: 160
  },
  formContainer: {
    margin: 10,
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
    fontWeight: 'bold'
  },
  faq_item: {
    padding: 10,
    margin: 3,
    backgroundColor: Color.gray
  },
  resource_item: {
    padding: 10,
    margin: 3,
    backgroundColor: Color.gray
  },
  dadProfile: {
    height: 100,
    width: '50%',
    marginLeft: '25%',
    backgroundColor: Color.gray,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "#aaa",
    borderWidth: 1

  },
  flexGrid: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 20 },
  flexItem: { width: '50%', padding: 5, height: 125, justifyContent: 'center', alignItems: 'center' },
  flexItemInner: { width: '100%', backgroundColor: Color.gray, padding: 10, justifyContent: 'center', alignItems: 'center'},
  teamInfo: { fontWeight: 'bold', marginTop: 2 },
  partnerName: {  marginTop: 2 },
});
