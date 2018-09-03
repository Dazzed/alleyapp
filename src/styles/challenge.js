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
});