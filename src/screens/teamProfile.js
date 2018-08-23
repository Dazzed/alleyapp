import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';

import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const TEAM_NAME = 'Team Name';
const DAD_NAME = 'Dad\'s Name';
const DAUGHTER_NAME = 'Daughter\'s Name';
const CREATION_DATE = 'Creation Date';

export default class TeamProfile extends Component {
  constructor() {
    super();
    this.state = {
      team_name: '',
      dad_name: '',
      daughter_name: '',
      creation_date: ''
    };
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'Team Profile',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });


  render() {
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.formContainer}>
            <FormLabel raised labelStyle={style.formLabel}>{TEAM_NAME}</FormLabel>
            <FormInput raised
              onChangeText={value => {
                this.setState({ team_name: value });
              }}
            />
            <FormLabel raised labelStyle={style.formLabel}>{DAD_NAME}</FormLabel>
            <FormInput raised
              onChangeText={value => {
                this.setState({ dad_name: value });
              }}
            />
            <FormLabel raised labelStyle={style.formLabel}>{DAUGHTER_NAME}</FormLabel>
            <FormInput raised
              onChangeText={value => {
                this.setState({ daughter_name: value });
              }}
            />
            <FormLabel raised labelStyle={style.formLabel}>{CREATION_DATE}</FormLabel>
            <FormInput raised
              onChangeText={value => {
                this.setState({ creation_date: value });
              }}
            />
          </View>
          <Button raised
            title={'Dad\'s Profile'}
            borderRadius={5}
            backgroundColor={Color.blue}
            textStyle={{ fontWeight: 'bold' }}
            style={style.button}
            onPress={() => {
              this.props.navigation.navigate('dadProfile')
            }}
          />
          <Button raised
            title={'Daughter\'s Profile'}
            borderRadius={5}
            backgroundColor={Color.blue}
            textStyle={{ fontWeight: 'bold' }}
            style={style.button}
            onPress={() => {
              this.props.navigation.navigate('daughterProfile')
            }}
          />
          <Button raised
            title={'Let\'s Start'}
            borderRadius={5}
            backgroundColor={Color.blue}
            textStyle={{ fontWeight: 'bold' }}
            style={style.button}
            onPress={() => {
              this.props.navigation.navigate('dashboard')
            }}
          />
          
        </View>
      </View>
    );
  }
}
