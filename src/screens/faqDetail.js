import React, { Component } from 'react';
import { View } from 'react-native';
import { GET_FAQ_DETAIL } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { Text, Icon } from 'react-native-elements';


export default class FaqDetail extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'FAQs',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  render() {
    const id = this.props.navigation.state.params.id;
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.formContainer}>
            <Query query={GET_FAQ_DETAIL} variables={{ id }}>
              {({ data: { faq_R }, loading }) => {
                if (loading || !faq_R) {
                  return <Text>Loading ...</Text>;
                }
                {
                  return (
                    <View>
                      <Text style={style.faq_item}>
                        {faq_R.question}
                      </Text>
                      <Text>
                        {faq_R.answer}
                      </Text>
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
