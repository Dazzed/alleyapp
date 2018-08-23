import { StyleSheet, Dimensions } from 'react-native';

import Color from 'constants/colors';

const { width } = Dimensions.get('window');

module.exports = StyleSheet.create({
  container: {
    padding: 10,
    margin: 30,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Color.white,
    justifyContent: 'space-between'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  row2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  box: {
    flex: 1,
    height: 175,
    backgroundColor: Color.darkBlue,
  },
  box1: {
    margin: 10,
  },
  box2: {
    margin: 10,
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
  }
});
