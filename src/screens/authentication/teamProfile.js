import React, { Component } from 'react';
import { View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Mutation } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { FormLabel, FormInput, Button, Text } from 'react-native-elements';

const TEAM_NAME = 'Team Name';

import { TEAM_MUTATION } from '../../graphql/mutation';
import { getUser } from '../../utils/util';

export default class TeamProfile extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      error: false,
      errorMessage: ''
    };
  }

  formatDate() {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  createTeam = async targetMutation => {
    try {
      const {
        title
      } = this.state;
      let member = [];
      member.push(await AsyncStorage.getItem('USER'));

      const data = await targetMutation({ variables: { title, member } });
      console.log(data);
      AsyncStorage.setItem('ACTIVE_TEAM', data.data.team_C);
      this.props.navigation.navigate('dadProfile')
    } catch (e) {
      console.log('Error in creating team', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      this.setState({
        error: true,
        errorMessage: e.message
      });
    }
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
      <Mutation mutation={TEAM_MUTATION}>
        {(team_C) => (
          <View style={style.container}>
            <View style={style.subContainer}>
              <View style={style.formContainer}>
                <Text h2>Create a new team</Text>
                <FormLabel raised labelStyle={style.formLabel}>{TEAM_NAME}</FormLabel>
                <FormInput raised
                  onChangeText={value => {
                    this.setState({ title: value });
                  }}
                />
                {this.state.error ? <Text style={style.error}>{this.state.errorMessage}</Text> : ''}
              </View>
              <Button raised
                title={'Next'}
                borderRadius={5}
                backgroundColor={Color.blue}
                textStyle={{ fontWeight: 'bold' }}
                style={style.button}
                onPress={this.createTeam.bind(this, team_C)}
              />
            </View>
          </View>
        )}
      </Mutation>
    );
  }
}
