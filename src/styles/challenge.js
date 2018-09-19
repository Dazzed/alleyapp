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
  challenge: {
    width: '100%',
  },
  challengeInfo: {
    width: '100%',
  },
  challengeStrip: {
    width: '96%',
    marginTop: 5,
    marginLeft: '2%',
    marginRight: '2%',
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
    fontSize: 16,
    color: "#0D0760",
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
    backgroundColor: "#EFF1F2",
    width: '96%',
    marginLeft: '2%',
    marginRight: '2%',
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  challengeBasicInfo: {
    width: '70%',
  },
  challengeInfoView: {
    width: '30%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  challegeInfoIconsView: {  borderRadius: 3, marginRight: '5%', padding: 5, backgroundColor: '#0D0760', height: 26},
  challegeInfoIcons: {
    width: 16, height: 16,
  },
  chatIcons: {
    width: 48, height: 48,
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
  challengeDetailsLabel: {
    fontWeight: 'bold',
    fontSize: 14,
    color: "#0D0760",
  },
  challengeDetailsValue: {
    fontWeight: 'normal'
  },
  challengeDescriptionView: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#0D0760',
    padding: 5,
    backgroundColor: "#fff",
    height: 130

  },
  challengeDescription: {
    fontSize: 14,
    color: "#0D0760",
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
    backgroundColor: '#FFF',
  },

  requestItemBg: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#8D8F91',
    padding: 10,
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: '#EFF1F2',
    padding: 10,
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
},

promptPictureBg: {
    width: "75%",
    height: 150,
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
  fontSize: 18,
  color: '#0D0760',
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
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
  width: '24%',
  margin: 1,
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

iSpyQuestionSetText: {
  width: '100%',
  fontSize: 15,
  color: '#FFF',
  marginTop: 5,
  textAlign: 'center',
},

iSpyQuestionPicView:{
  width: "55%",
  alignItems: 'center',
  justifyContent: 'center',
  height: 150,
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
  height: 65,
  alignSelf: 'center',
},

iSpyInActiveImageIcon: {
  width: "90%",
  height: 65,
  backgroundColor: '#dddddd',
  alignSelf: 'center',
},

eggTossLabel: {
  fontSize: 15,
  color: '#0D0760',
  textAlign: 'left',
  marginTop: 15,
},

inputEggToss:{
  width: "100%",
  alignSelf: 'center',
  padding: 10,
  height: 40,
  backgroundColor: '#ffffff',
  borderColor: '#0D0760',
  borderWidth:1,
},

eggTossChildRowView100: {
  width: "100%",
  justifyContent: 'center',
},

eggTossChildRowView50Left: {
  width: "50%",
  justifyContent: 'flex-start',
},

eggTossChildRowView50Right: {
  width: "50%",
  justifyContent: 'flex-end',
  alignSelf: 'flex-end'
},

});
