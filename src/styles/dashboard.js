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
  dashboard: {
    width: '100%'
  },
  sectionTitle: {
    color: "#61037C",
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: '2%'
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
    flexDirection: 'row'
  },
  progressLabel: {
    fontWeight: 'bold',
    color: '#ffffff',
    width: '50%'
  },
  progressValue: {
    color: "#ffffff88",
    width: '50%',
    textAlign: 'right'
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
    color: "#0D0760",
    padding: 5
  },
  challengePoints: {
    fontSize: 14,
    color: "#0D0760",
    fontWeight: 'bold',
    width: '25%',
    padding: 5,
    textAlign: 'right'
  },
  challengeLabel: {
    fontSize: 14,
    color: "#0D0760",
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 1
  },
  challengeValue: {
    color: "#0D0760",
    fontSize: 14,
    fontWeight: 'normal'
  },
  challengeStatus: {
    fontSize: 10,
    width: '100%',
    marginRight: 5,
    textAlign: 'right'
  }
});
