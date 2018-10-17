
import React, { Component } from 'react';
import {Platform,Modal, BackHandler,StyleSheet,Image,ActivityIndicator,ImageBackground,Text,TextInput,KeyboardAvoidingView,StatusBar,View,TouchableOpacity,AsyncStorage,Alert} from 'react-native';
import styleLoader from '../loader/progressbar_style';

export default class ProgressLoader extends Component{

 render() {
   return (
     <View style={styleLoader.loder}>
         <ActivityIndicator size="large" color="#5E727D" />
         <Text  style={styleLoader.loaderText}>Please wait...</Text>
     </View>
   )
 }
}
