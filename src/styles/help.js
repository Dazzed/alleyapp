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
    alignItems: 'center'
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
  box_text: {
    color: Color.white,
    textAlign: 'center'
    
  },
  box_subtext: {
    color: Color.white,
    textAlign: 'center',
    fontSize: 12
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
  },


  flexContainer: {
    padding: 0,
    margin: 0,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },


flexItem: {
  padding: 5,
  width: '50%',
  height: '100%'
}
});