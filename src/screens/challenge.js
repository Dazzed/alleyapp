import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity, AsyncStorage, Image, ScrollView } from 'react-native';
import { GET_CHALLENGE } from '../graphql/queries';
import PhotoUpload from 'react-native-photo-upload';

import { Query } from "react-apollo";

import Color from 'constants/colors';
import style from 'styles/challenge';
import StopWatch from './stopwatch';

import { Text, FormInput, Button, FormLabel } from 'react-native-elements';

export default class Challenge extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      showBubbleQuestion: false,
      activeBubbleQuestion: '',
      activeChatItemId: null,
      challenge5Artboard: null,
      challenge3Questions: null,
      challenge3CurrentIndex: 0,
      challenge3ShowPrompt: false,
      stopwatchStart: false,
      stopwatchReset: true,
      btnTitle: 'NEXT'
    }
  }

  chatIcons = [
    { file: require('../assets/images/chat_question1.png') },
    { file: require('../assets/images/chat_question2.png') },
    { file: require('../assets/images/chat_question3.png') },
    { file: require('../assets/images/chat_question4.png') },
    { file: require('../assets/images/chat_question5.png') },
    { file: require('../assets/images/chat_question6.png') },
    { file: require('../assets/images/chat_question7.png') }
  ]

static navigationOptions = ({ navigation: { navigate, state } }) => ({
    title: state.params.missionTitle.toUpperCase(),
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.main
    }
  });

  loadInstructions = (data, type) => {
    this.props.navigation.navigate('instructions', {
      missionTitle: this.props.navigation.state.params.missionTitle,
      type: type,
      data: data
    })
  }

  renderChallengeFive = challenge => {
    return (
      challenge.requests.map(request => {
        {
          if (request.type === 'wordFit')
            return (
              <View key={request.id} style={style.requestItem}>
                <FormLabel raised labelStyle={style.formLabel}>{request.data}</FormLabel>
                <FormInput raised
                />
              </View>
            )
        }
      })
    )
  }

  renderChallengeFour = challenge => {
    return (
      challenge.requests.map(request => {
        {
          if (request.type === 'wordFit')
            return (
              <View key={request.id} style={style.requestItem}>
                <FormLabel raised labelStyle={style.formLabel}>{request.data}</FormLabel>
                <FormInput raised
                />
              </View>
            )
        }
      })
    )
  }

  renderChallengeThree = challenge => {
    return (
      challenge.requests.map((request,index) => {
        {
          if (request.type === 'prompt' && index == 0)
            return (
              <View key={"challenge3_" + request.id} style={style.requestItemParent}>
                <View style={style.requestItemBg}>
                  <View style={style.promptViewParent}>
                    <View style={style.showPromptView}>
                      <TouchableOpacity onPress={() => this.showPrompt(index)} style = {style.touchableOpacityShowPrompt}>
                          <Text style={style.textShowPrompt}>SHOW PROMPT</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={style.promptQuestionViewBg}>
                        <View style={style.promptQuestionView}>
                          {this.state.challenge3ShowPrompt && <Text raised style={style.textQuestion}>{this.state.challenge3Questions[this.state.challenge3CurrentIndex].data}</Text>}
                        </View>
                    </View>
                  </View>
                  <View style={style.promptResponseView}>
                    <View style={style.timerViewBg}>
                        <StopWatch
                       false
                       start={this.state.stopwatchStart}
                       reset={this.state.stopwatchReset}/>
                    </View>
                    <View style={style.pictureViewBg}>
                        <View style={style.promptPictureBg}>
                          <PhotoUpload containerStyle={{ height: 150 }}
                            onPhotoSelect={avatar => {
                              if (avatar) {
                                this.loadPicture(avatar)
                              }
                            }}>
                            <Image
                                style={{
                                  width: 150,
                                  height: 150,
                                }}
                                resizeMode='cover'
                                source={{
                                  uri: (this.props.navigation.state.params.teamPictureUrl) ? this.props.navigation.state.params.teamPictureUrl : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
                                }}
                              />
                          </PhotoUpload>
                        </View>
                    </View>
                  </View>
                </View>
                <View style= {style.optionNextCancelView}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                        <Text style={style.textShowPrompt}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.next(index)} style = {[this.state.stopwatchStart? style.touchableOpacityNextActive : style.touchableOpacityNextInactive]}>
                        <Text style={style.textShowPrompt}>{this.state.btnTitle}</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )
        }
      })
    )
  }

  showPrompt = index => {
    if(!this.state.stopwatchStart){
      this.setState({
        challenge3ShowPrompt: true,
        challenge3CurrentIndex:index,
        stopwatchStart: true,
        stopwatchReset: false,
      })
      console.log('StopWatch start Running');
    }else{
      console.log('StopWatch Running');
    }

  };

  next = index => {
    if(this.state.stopwatchStart){
      if(this.state.challenge3CurrentIndex < (this.state.challenge3Questions.length - 1)){
          this.setState({challenge3CurrentIndex: this.state.challenge3CurrentIndex+1});
          if(this.state.challenge3CurrentIndex == (this.state.challenge3Questions.length - 2)){
              this.setState({btnTitle: "SUBMIT"});
          }else{
              console.log('challenge3Questions +1 : '+this.state.challenge3Questions[this.state.challenge3CurrentIndex].data)
          }
      }
    }else{
      alert('Please start prompt first.');
    }
  };

  renderChallengeTwo = challenge => {
    return (
      <View style={style.challenge2}>
        <Text>CHOOSE A BUBBLE TO ANSWER OR EDIT A QUESTION</Text>
        {this.state.showBubbleQuestion === false ?
          <View style={style.bubblesView}>
            {this.renderBubbles(challenge)}
          </View>
          :
          <View>
            <View style={style.bubbleQuestionView}>
              <Image style={style.chatIconImage} source={this.chatIcons[this.state.activeChatItemId].file} />
              <Text style={style.chatIconText}>{this.state.activeBubbleQuestion}</Text>
            </View>
            <FormInput raised placeholder="Please type answer here" />
          </View>
        }
      </View>
    )
  }

  renderBubbles = challenge => {
    let requestIcon = 0;
    console.log(challenge.requests)
    return (
      challenge.requests.map((request, index) => {
        {
          if (request.type === 'bubble' || request.type === 'eitherOr') {
            return (
              <TouchableHighlight style={style.chatItem} key={"bubble_" + request.id} onPress={() => this.showChatQuestion(index, request.data)}>
                <View>
                  <Image style={style.chatIcons} source={this.chatIcons[requestIcon++].file} />
                </View>
              </TouchableHighlight>
            )
          }
        }
      })
    )
  }

  showChatQuestion = (item, question) => {
    this.setState({
      activeBubbleQuestion: question,
      showBubbleQuestion: true,
      activeChatItemId: item
    })
  }


  renderChallengeResponseForm = challenge =>  {
    if (challenge.type == "1" ) {
      return this.renderChallengeOne(challenge)
    }
    if (challenge.type == "2") {
      return this.renderChallengeTwo(challenge)
    }
    if (challenge.type == "3") {
      if (this.state.challenge3Questions != null) {
        return this.renderChallengeThree(challenge)
      } else {
        this.setState({
          challenge3Questions: challenge.requests
        })
      }
    }

    if (challenge.type == "4") {
      return this.renderChallengeFour(challenge)
    }
    if (challenge.type == "5") {
      return this.renderChallengeFive(challenge)
    }
  }
  render() {
    const id = this.props.navigation.state.params.id;
    return (
      <ScrollView>
        <View style={style.container}>
          <Query query={GET_CHALLENGE} variables={{ id }} fetchPolicy="network-only">
            {({ data: { challenge_R }, loading }) => {
              if (loading || !challenge_R) {
                return <Text>Loading ...</Text>;
              }
              {
                return (
                  <View style={style.challenge}>
                    <View style={style.challengeInfo}>
                      <View style={style.challengeStrip}>
                        <View style={style.challengeTitleView}>
                          <Text style={style.challengeTitle}>{challenge_R.title}</Text>
                          <View style={style.challengePointsView}>
                            <Text style={style.challengePoints}>{challenge_R.maxPts} Pts</Text>
                          </View>
                        </View>
                      </View>
                      <View style={style.challengeDetailsView}>
                        <View style={style.challengeBasicInfo}>
                          <Text style={style.challengeDetailsLabel}>
                            Available Points:
                            <Text style={style.challengeDetailsValue}> {challenge_R.maxPts}</Text>
                          </Text>
                          <Text style={style.challengeDetailsLabel}>
                            Materials:
                            <Text style={style.challengeDetailsValue}> {challenge_R.materials}</Text>
                          </Text>
                        </View>
                        <View style={style.challengeInfoView}>
                          {
                            challenge_R.description.map(desc => {
                              if (desc.type === "video")
                                return (
                                  <TouchableHighlight onPress={() => this.loadInstructions(desc.url, 'video')}>
                                    <View style={style.challegeInfoIconsView}>
                                      <Image style={style.challegeInfoIcons} source={require('../assets/images/video.png')} />
                                    </View>
                                  </TouchableHighlight>
                                )
                            })}
                          {
                            challenge_R.description.map(desc => {
                              if (desc.type === "audio")
                                return (
                                  <TouchableHighlight onPress={() => this.loadInstructions(desc.url, 'audio')}>
                                    <View style={style.challegeInfoIconsView}>
                                      <Image style={style.challegeInfoIcons} source={require('../assets/images/audio.png')} />
                                    </View>
                                  </TouchableHighlight>
                                )
                            })}
                          {
                            challenge_R.description.map(desc => {
                              if (desc.type === "text")
                                return (
                                  <TouchableHighlight onPress={() => this.loadInstructions(desc.data, 'text')}>
                                    <View style={style.challegeInfoIconsView}>
                                      <Image style={style.challegeInfoIcons} source={require('../assets/images/info.png')} />
                                    </View>
                                  </TouchableHighlight>
                                )
                            })}
                        </View>
                      </View>
                      {
                        challenge_R.description.map(desc => {
                          if (desc.type === "text")
                          return (
                            <View key={desc.id} style={style.challengeDetailsView}>
                              <View style={style.challengeDescriptionView}>
                                <ScrollView>
                                  <Text style={style.challengeDescription}>{desc.data}</Text>
                                </ScrollView>
                              </View>
                            </View>
                          )
                      })}
                    </View>
                    <View style={style.challengeResponse}>
                      {
                        this.renderChallengeResponseForm(challenge_R)
                      }
                    </View>
                  </View>
                );
              }
            }}
          </Query>
        </View>
      </ScrollView>
    );
  }
}
