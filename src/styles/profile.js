import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    justifyContent: 'space-between'
  },

  containerScrollbar: {
    flex: 1,
    backgroundColor: Color.white,
  },
  photoContainer: {
    marginTop: 10,
    backgroundColor: Color.white,
    height: 150,
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
    fontWeight: 'bold',
    margin: 20,
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
  flexItem1: { width: '100%', height: 75, justifyContent: 'center', alignItems: 'center' },
  flexItemInner: { width: '100%', backgroundColor: Color.gray, padding: 10, justifyContent: 'center', alignItems: 'center'},
  flexItemInnerInActive: { width: '100%', height: 60, backgroundColor: Color.gray, justifyContent: 'flex-start', alignItems: 'flex-start'},
  flexItemInnerActive: { width: '100%', height: 60, justifyContent: 'flex-start', alignItems: 'flex-start', backgroundColor: 'rgb(240, 128, 128)'},
  flexRow: { flex: 1, flexDirection: 'row', flexWrap: 'wrap',justifyContent: 'center', alignItems: 'center',marginLeft: 10,},
  flexColumn: {flexDirection: 'column', marginLeft: 15,justifyContent: 'flex-start', alignItems: 'flex-start'},
  teamInfo: { fontWeight: 'bold', marginTop: 2, textAlign: 'center',},
  partnerName: {  marginTop: 2, textAlign: 'center' },
  swipeViewOption1:{
    backgroundColor: 'green',
    height: 60,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
  swipeViewOption2:{
    backgroundColor: 'red',
    height: 60,
    width: 75,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
