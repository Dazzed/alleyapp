import React, { Component } from 'react';
import { View, Image, TouchableHighlight, Text, TextInput, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import Color from 'constants/colors';
import style from 'styles/signin';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default class PrivacyPolicy extends Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    header: null
  };

  render() {
    return (
        <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
          <View style={{backgroundColor: 'white'}}>
            <View style={style.welcomeContainer0}>
                <Image resizeMode="contain"
                  source={require('../../assets/images/alley-oop-logo.png')}
                  style={style.logoImg}
                />
                <Image resizeMode="contain"
                  source={require('../../assets/images/alley-oop.png')}
                  style={style.logoName}
                />
            </View>
            <View style = {style.termsBox}>
              <TouchableHighlight style={style.crossIconOpacity} onPress={() => this.props.navigation.goBack()}>
                  <Image resizeMode="contain"
                    source={require('../../assets/images/cross_icon.png')}
                  />
              </TouchableHighlight>

              <View style= {{paddingTop: 20}}>
                  <Text style={{color: 'black',fontSize: 20, alignSelf: 'center'}}>Terms & Conditions</Text>
                  <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
                      <Text style={{padding: 10,fontSize:12}}>Lorem ipsum dolor sit amet, aptent elit, dui vel est sed dictum, eleifend ultrices in sit arcu lectus, tellus nulla lacus ut vestibulum sit ultricies, donec felis sed. Maecenas maecenas non neque vestibulum vel condimentum, in risus feugiat, justo mauris massa accumsan cursus id nibh, ut quam lectus donec, wisi porta ligula porta. Justo sed eleifend massa explicabo phasellus.
                            Et id molestie suspendisse mus, tortor suspendisse nibh purus arcu mauris venenatis, elementum magnis lectus nulla dui tristique mollis, sem mauris suscipit suscipit. Nibh ut natoque sit vestibulum proin nulla, justo ut tellus vel quisque tincidunt nisl, massa ligula. Risus elit libero nullam rhoncus eget in, ut vestibulum, id natoque porta. Luctus vestibulum magna nunc. Laoreet orci sagittis nam in iaculis gravida, morbi consequat orci massa est.
                            Aliquam perspiciatis id ut in dui nulla, eget feugiat tincidunt, ante enim eget nam suscipit, placerat elementum. Vestibulum tristique sit morbi id dignissim condimentum, laoreet fames tortor convallis vel, nonummy tincidunt netus, odio amet vel, amet tristique lorem erat</Text>
                  </KeyboardAwareScrollView>
              </View>
            </View>
          </View>
      </KeyboardAwareScrollView>
    );
  }
}
