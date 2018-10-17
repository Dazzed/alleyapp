import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  loaderMoedl: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  loder: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    alignSelf: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: "45%",
    bottom: 0,
    flex: 1,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogAlertBg: {
    backgroundColor: 'white',
    width: "90%",
    height: 120,
    borderRadius: 10,
    top: "40%",
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },

  dialogAlertView: {
    backgroundColor: 'white',
    width: "90%",
    height: 120,
    borderRadius: 10,
    top: "40%",
    alignSelf: 'center',
    position: 'absolute',
    bottom: 0,
    flex: 1,
    zIndex: 999,
  },

  dialogBg: {
    backgroundColor: 'transparent',
    width: "100%",
    marginBottom: 55,
    height: 'auto',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    top: 0,
    bottom: 0,
  },

  dialogBgBottom: {
    backgroundColor: 'transparent',
    width: "100%",
    marginBottom: 20,
    height: 'auto',
    alignSelf: 'center',
    alignItems: "center",
    justifyContent: 'center',
    zIndex: 999,
    position: 'absolute',
    top: 0,
    bottom: 0,
  },

  loaderText: {
    color: 'black',
    padding:2,
    fontSize: 10,
  },

  alertTitle: {
    fontSize:18,
    margin:15,
    color:'black',
    fontFamily:"CaviarDreams",
  },

  alertMessage: {
    fontSize:16,
    marginLeft:15,
    color:'black',
    fontFamily:"CaviarDreams",
  },

  alertOpacityOK: {
    position:'absolute',
    right:15,
    bottom:15,
  },

  alertOpacityRight: {
    position:'absolute',
    right:70,
    bottom:15,
  },

  alertOK: {
    fontSize:20,
    marginRight:15,
    color:'black',
    fontFamily:"CaviarDreams",
  },

});
