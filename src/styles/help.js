import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.white,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: '50%',
    marginBottom: 0
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0
  },
  box: {
    flex: 1,
    backgroundColor: Color.darkBlue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  box_text: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 24 
  },
  box_subtext: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 12
  },
  box1: {
    height: '55%',
    margin: 5,
  },
  box2: {
    height: '55%',
    margin: 5,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.darkBlue,
  },
  helpLink: {
    color: Color.white,
    fontWeight: 'bold',
    fontSize: 20
  },
});