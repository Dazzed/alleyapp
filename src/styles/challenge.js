import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },


  scrollStyleChallenge: {
    width: '100%',
    backgroundColor: 'white',
    marginTop: 10,
    paddingTop: 10
  },

  scrollStyleChallengeBlue: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: 15
  },

  challenge: {
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute'
  },

  challengeSpaceView: {
    width: '92%'
  },

  challengeStrip: {
    width: '100%',
    position:'relative'
  },
  challengeTitleView: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: "#B7BABC",
  },
  challengeTitle: {
    width: '80%',
    fontWeight: 'bold',
    fontSize: 12,
    color: "#FFFFFF",
  },
  challengePointsView: {
    width: '20%',
    backgroundColor: '#8D8F91',
  },
  challengePoints: {
    textAlign: 'center',
    color: "#fff"
  },

  challengeDetailsView: {
    backgroundColor: "#FFFFFF",
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },

  challengeDescriptionView: {
    width: '100%',
    backgroundColor: "#fff",
    height: 200,
    borderRadius:8,
    shadowColor: '#ccc',
    shadowOffset: {width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,

  },

  challengeDetailsLabel: {
    fontWeight: 'bold',
    fontSize: 12,
    padding: 5,
    color: "rgb(74,74,74)",
  },

  challengeDetailsValue: {
    fontWeight: 'normal',
    fontSize: 12,
    padding: 5,
    color: "rgb(74,74,74)",
  },

  challengeDescription: {
    fontWeight: 'normal',
    fontSize: 12,
    padding: 5,
    color: "rgb(112,112,112)",
  },

  challengeInfoView: {
    width: '30%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  challegeInfoIconsView: {
    borderRadius: 3,
    marginRight: '5%',
    padding: 5,
    backgroundColor: '#0D0760',
    height: 26
  },
  challegeInfoIcons: {
    width: 16, height: 16,
  },
  chatIcons: {
    width: 48,
    height: 48,
    alignSelf: 'center'
  },

  chatIconsRight: {
    width: 15,
    height: 15,
    alignSelf: 'center',
    position: 'absolute',
    alignSelf: 'center',
  },

  chatIconText: {
    width: '75%',
    marginLeft: 10
  },
  chatIconImage: {
    width: 48, height: 48,
  },
  chatItem: {
    width: '25%',
    justifyContent: 'center',
    padding: 5,
  },

  bubbleQuestionView: {
    flex:1,
    flexDirection: "row",
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 15
  },
  bubblesView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    margin: 30,

  },

  backgroundVideo: {
    flex: 1,
    flexDirection: 'row',
    height: 200,
  },
  video: {
    width: '100%'
  },
  requestItem: {
    margin: 10,
  },

  promptView: {
    flex: 1,
    flexDirection:'row',
  },

  promptResponseView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  promptTime: {
    width: '40%',
    margin: '5%',
    height: 24,
    borderRadius: 2,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
  promptPicture: {
    width: '50%',
    margin: '5%',
  },


  //Style for TimedHunt

  requestItemParent: {
    backgroundColor: '#FFFFFF',
    width: "100%",
  },

  requestItemBg: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FFF',
  },

  equestItemBg2: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 2,
    marginRight: 2,
    backgroundColor: '#8D8F91',
    padding: 10,
  },

  requestItemBg1: {
    backgroundColor: '#FFFFFF',
    paddingLeft:7,
    paddingRight: 7,
  },

  promptViewParent: {
    flexDirection:'row',
    width: "100%",
  },

  showPromptView: {
    width: "40%",
    marginRight: 5,
  },

  promptQuestionViewBg: {
    width: "55%",
    marginLeft: 5,
  },

  textQuestion: {
    width: "100%",
    margin: 0,
    padding:5,
  },

  touchableOpacityShowPrompt: {
    backgroundColor: 'blue',
    width: "100%",
    height: 40,
    borderRadius: 5,
    margin:5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textShowPrompt: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignSelf: 'center',
},

promptQuestionView: {
  width: '100%',
  backgroundColor: '#fff',
  borderWidth: 1,
  borderRadius: 2,
  borderColor: '#0D0760',
  marginLeft: '2%',
  margin:5,
  height:50,
},

timerViewBg:{
  width: "35%",
  height: 150,
  marginRight: 5,
  justifyContent: 'center',
  alignItems: 'center',
},

pictureViewBg: {
  width: "60%",
  height: 150,
  marginLeft: 5,
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  alignSelf: 'flex-end',
},

pictureViewBg1: {
  width: "80%",
  height: 150,
  marginLeft: 5,
  alignSelf: 'flex-end',
},

promptPictureBg: {
    width: "75%",
    height: 150,
},

promptPictureBg1: {
    width: "75%",
    height: 150,
    alignSelf: 'flex-start',
},

optionNextCancelView: {
  width: "50%",
  height: 40,
  alignSelf: 'flex-end',
  marginRight: 5,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
},

optionNextCancelCenterView: {
  width: "100%",
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:20,
},

touchableOpacityCancelOption: {
  backgroundColor: 'blue',
  width: "40%",
  height: 30,
  borderRadius: 5,
  alignItems: 'center',
  marginRight: 5,
  justifyContent: 'center',
},

touchableOpacityNextInactive: {
  backgroundColor: 'grey',
  width: "40%",
  height: 30,
  borderRadius: 5,
  marginLeft: 5,
  alignItems: 'center',
  justifyContent: 'center',
},

touchableOpacityNextActive: {
  backgroundColor: 'blue',
  width: "40%",
  height: 30,
  borderRadius: 5,
  marginLeft: 5,
  alignItems: 'center',
  justifyContent: 'center',
},

headingTextChallenge4:{
  fontSize: 18,
  color: '#FFF',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
},

headingTextChallenge2:{
  width: "60%",
  fontSize: 12,
  fontWeight: 'bold',
  color: '#0D0760',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop:15,
  textAlign: 'center',
},

questionChallenge2Text: {
  width: '85%',
  marginLeft: 10,
  fontSize: 15,
  color: '#0D0760',
  alignItems: 'center',
  justifyContent: 'center',
},

iconImageQuestionChallenge2: {
  width: 48,
  height: 48,
},

viewQuestionIconChallenge2:{
  width: "20%",
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
},
viewQuestionTextChallenge2:{
  width: "80%",
  alignItems: 'center',
  justifyContent: 'center',
},

iSpyGridView: {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
},

iSpyImageOpacity: {
  width: '33%',
},

iSpyTitle:{
  width: "100%",
  fontSize:13,
  color: 'white',
  textAlign: 'center',
},

iSpyQuestionIconView:{
  width: "45%",
  height: 150,
  alignItems: 'center',
  justifyContent: 'center',
},

iSpyQuestionSetIcon:{
  width: "65%",
  height: 85,
  alignItems: 'center',
  justifyContent: 'center',
},

iSpyQuestionPicView:{
  width: "55%",
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
},

iSpyQuestionSetText: {
  width: '100%',
  fontSize: 15,
  color: '#FFF',
  marginTop: 5,
  textAlign: 'center',
},



inputChitChatAnswer:{
  width: "100%",
  alignSelf: 'center',
  padding: 10,
  marginTop: 15,
  height: 100,
  backgroundColor: '#ffffff',
  borderColor: '#BCE0FD',
  borderWidth:1,
},

inputPhotoLabelISpy:{
  width: "100%",
  alignSelf: 'center',
  padding: 10,
  marginTop: 15,
  height: 40,
  backgroundColor: '#ffffff',
  borderColor: '#BCE0FD',
  borderWidth:1,
},

foodCrazyParentView: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: "100%",
},

eggTossParentView: {
  flex: 1,
  flexDirection: 'row',
  flexWrap: 'wrap',
  backgroundColor: 'white',
  width: '100%'
},

chitChatEitherOrParentView: {
  flex: 1,
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: "100%",
  backgroundColor: '#FFF'
},

foodCrazyChildRowView: {
  width: "100%",
  justifyContent: 'center',
},

foodCrazyLabel: {
  fontSize: 15,
  color: '#FFF',
  textAlign: 'left',
  marginTop: 15,
},

inputfoodCrazy:{
  width: "100%",
  alignSelf: 'center',
  padding: 10,
  height: 40,
  backgroundColor: '#ffffff',
  borderColor: '#BCE0FD',
  borderWidth:1,
},

iSpyActiveImageIcon: {
  width: "90%",
  height: 75,
  alignSelf: 'center',
},

iSpyInActiveImageIcon: {
  width: "90%",
  height: 75,
  alignSelf: 'center',
},

iSpyInActiveView: {
  width: "90%",
  height: 75,
  position: 'absolute',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  alignSelf: 'center',
  top:4,
},

inputEggToss:{
  width: "100%",
  alignSelf: 'center',
  padding: 7,
  height: 45,
  backgroundColor: '#ffffff',
  borderColor: 'rgb(112,112,112)',
  borderWidth:1,
  borderRadius:5,
  shadowColor: '#ccc',
  shadowOffset: {width: 1, height: 1 },
  shadowOpacity: 0.5,
  shadowRadius: 5,
},

eggTossChildRowView100: {
  width: "100%",
  justifyContent: 'center',
  marginTop: 20,
  backgroundColor: 'white'
},

eggTossChildRowView50Left: {
  width: "47%",
  justifyContent: 'center',
  margin: 4,
},

eggTossChildRowView50Right: {
  width: "50%",
  justifyContent: 'flex-end',
  alignSelf: 'flex-end'
},

submitStyle: {
  width: "45%",
  backgroundColor: '#4A035E',
  alignSelf: 'center',
  borderRadius: 50,
  padding:12,
},

cancelStyle: {
  width: "45%",
  backgroundColor: 'white',
  alignSelf: 'center',
  borderRadius: 50,
  padding:12,
  marginLeft:20,
  borderColor: '#4A035E',
  borderWidth: 1
},

submitText: {
  textAlign: 'center',
  fontSize: 14,
  lineHeight: 16,
  color: '#FFFFFF',
  fontWeight: 'bold',
  padding:5,
},



cancelText: {
  textAlign: 'center',
  fontSize: 14,
  lineHeight: 16,
  color: '#4A035E',
  fontWeight: 'bold',
  padding:5,
},

});
