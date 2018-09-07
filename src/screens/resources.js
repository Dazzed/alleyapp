import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { GET_RESOURCE } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { Text, Icon } from 'react-native-elements';


export default class Resources extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'RESOURCES',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  showResourceDetail = resource_item => {
    this.props.navigation.navigate('resourcesDetails', {
      id: resource_item
    })
  }

  render() {
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.formContainer}>
            <Query query={GET_RESOURCE}>
              {({ data: { resource_RA }, loading }) => {
                if (loading || !resource_RA) {
                  return <Text>Loading ...</Text>;
                }
                {
                  return resource_RA.map(resource_item => {
                    return (
                      <View style={style.resource_item} key={resource_item.id}>
                        <TouchableHighlight onPress={() => this.showResourceDetail(resource_item.id)}>
                          <Text>
                            {resource_item.title}
                          </Text>
                        </TouchableHighlight>
                      </View>
                    );
                  })
                }
              }}
            </Query>
          </View>
        </View>
      </View>
    );
  }
}
