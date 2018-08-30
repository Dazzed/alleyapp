import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { GET_RESOURCE_DETAIL } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { Text, Icon } from 'react-native-elements';


export default class ResourcesDetails extends Component {
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

  render() {
    const { navigation } = this.props;
    console.log(navigation);
    const id = this.props.navigation.state.params.id;
    // const id = "6810b91d-83d9-4ee9-b696-aabc170d6491";
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.formContainer}>
            <Query query={GET_RESOURCE_DETAIL} variables={{ id }}>
              {({ data: { resource_R }, loading }) => {
                if (loading || !resource_R) {
                  return <Text>Loading ...</Text>;
                }
                {
                  return (
                    <View>
                      <Text style={style.resource_item}>
                        {resource_R.title}
                      </Text>
                      {resource_R.type === 'image' ?
                        <Image
                          style={{
                            paddingVertical: 30,
                            width: 150,
                            height: 150,
                            borderRadius: 75
                          }}
                          resizeMode='cover'
                          source={{
                            uri: resource_R.content
                          }}
                        />
                      :
                        <Text>
                          {resource_R.content}
                        </Text>
                      }
                    </View>
                  );
                }
              }}
            </Query>
          </View>
        </View>
      </View>
    );
  }
}