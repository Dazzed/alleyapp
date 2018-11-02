import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.white,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dashboard: {
    width: '100%',
    backgroundColor: Color.white,
  },

  progressSummary: {
    width: '100%',
    padding:10,
    backgroundColor: Color.white,
  },

  challenges: {
    width: '100%',
    padding:10,
    backgroundColor: '#FAFAFA',
  },

  sectionTitle: {
    color: "#464646",
    fontWeight: 'normal',
    marginBottom: 10,
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center'
  },

  progressValue0: {
    color: "#4B4747",
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:15,
  },

  progressLabel0: {
    fontWeight: 'bold',
    color: '#4B4747',
    fontSize:15,
    textAlign: 'center'
  },

  progressItems0: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 10,
    width: '96%',
    flex: 1,
    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.9,
    shadowRadius: 1,
  },


  progressItems: {
    backgroundColor: '#0D0760',
    padding: 15,
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: 5,
    marginBottom: 5,
    width: '96%',
    flex: 1,
    flexDirection: 'row',
  },


  progressLabel: {
    fontWeight: 'bold',
    color: '#4B4747',
    width: '50%',
    fontSize:15,
  },
  progressValue: {
    color: "#7B7474",
    width: '50%',
    textAlign: 'right',
    fontSize:14,
    fontWeight: 'normal',
  },
  challenge: {
    width: '70%',

  },
  challengeItem: {
    borderWidth: 1,
    borderColor: "#707070",
    padding: 5,
    marginLeft: '2%',
    marginRight: '2%',
    width: '96%',
    marginBottom: 10,
    backgroundColor: "#EFF1F2"
  },
  challengeTitleRow: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  challengeTitleView: {
    backgroundColor:'#B7BABC',
    borderWidth: 1,
    borderColor: "#707070",
    width: '75%',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#FFFFFF",
    marginBottom:10,
  },
  challengePoints: {
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop:10,
  },
  challengeLabel: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: 'bold',
    marginTop: 1
  },
  challengeValue: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: 'normal'
  },
  challengeStatus: {
    fontSize: 10,
    width: '100%',
    marginRight: 5,
    textAlign: 'right'
  }
});
