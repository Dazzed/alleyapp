import React, { Component } from 'react';
import { View, TouchableHighlight } from 'react-native';
import { GET_FAQ } from '../graphql/queries';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/profile';

import { Text, Icon } from 'react-native-elements';


export default class Faq extends Component {
  constructor() {
    super();
  }

  static navigationOptions = ({ navigation: { navigate } }) => ({
    title: 'FAQ',
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  showFaqDetail = faq_item => {
    this.props.navigation.navigate('faqDetail', {
      id: faq_item
    })
  }
  
  render() {
    return (
      <View style={style.container}>
        <View style={style.subContainer}>
          <View style={style.formContainer}>
            <Query query={GET_FAQ}>
              {({ data: { faq_RA }, loading }) => {
                if (loading || !faq_RA) {
                  return <Text>Loading ...</Text>;
                }
                {return faq_RA.map(faq_item => {
                    return (
                      <View style={style.faq_item} key={faq_item.id}>
                        <TouchableHighlight onPress={() => this.showFaqDetail(faq_item.id)}>
                          <Text>
                            {faq_item.question}
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
