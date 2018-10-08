import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity, AsyncStorage, WebView, Image, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
import { GET_CHALLENGE } from '../graphql/queries';
import { Mutation } from "react-apollo";
import { Query } from "react-apollo";
import { ANSWER_CHALLENGE_MUTATION, ANSWER_CHALLENGE_I_SPY_MUTATION , ANSWER_CHALLENGE_EGG_TOSS_MUTATION} from '../graphql/mutation';

import Color from 'constants/colors';
import style from 'styles/challenge';
import StopWatch from './stopwatch';
import axios from 'axios';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
import { Text, FormInput, Button, FormLabel } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Video from 'react-native-video';


export default class Challenge extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      showBubbleQuestion: false,
      activeBubbleQuestion: '',
      activeBubbledataObj: null,
      activeChatItemId: null,
      requestTypeChitChat: '',
      requestIDChitChat: null,
      setChitChatAnswer: '',
      challenge3Questions: null,
      challenge3CurrentIndex: 0,
      challenge3ShowPrompt: false,
      challenge4Questions: null,
      challenge4CurrentIndex: 0,
      showChallenge4Question: false,
      activeISpyQuestionTitle: '',
      activeISpyQuestionUrl: '',
      activeISpyQuestionID: '',
      activeISpyQuestionType: '',
      activeISpyItemId: null,
      setPhotoLable: '',
      stopwatchStart: false,
      stopwatchReset: true,
      challenge5Artboard: null,
      showChallengeArtboard: false,
      btnTitle: 'NEXT',
      missionID: '',
      teamId: '',
      setImageAnswer: '',
      foodCrazyAnswers: {},
      setUpdatedArtBoard: '',
      requestIDFoodCrazy: null,
      selectedFoodCrazyValues: null,
      challengeResponseDetail: null,
      selectedEggTossValues: null,
      requestResponseEggToss: null,
      isLoadChallengeOne: false,
      challengeOneCurrentIndex: -1,
      requestIDEggToss: null,
      videoSource: null,
      isRequestForImage: true,
      isSetDefaultImage: true,
      setImageFromServer: '',
      requestForVideo: false,
      setImageFromLocal: require('../assets/images/default_icon.png')//'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
    }
    this.challengeChitChat = this.challengeChitChat.bind(this);
    this.challengeTimedHunt = this.challengeTimedHunt.bind(this);
    this.challengeISpy = this.challengeISpy.bind(this);
    this.challengeFoodCrazy = this.challengeFoodCrazy.bind(this);
    this.challengeEggToss = this.challengeEggToss.bind(this);
    this.myRef = React.createRef()

  }

  componentDidMount(){
    AsyncStorage.getItem('IS_TIMER_RESET').then((value) => {
        if(value === 'true'){
            this.setState({stopwatchReset: false});
        }else{
            this.setState({stopwatchReset: true});
        }
        AsyncStorage.setItem('IS_TIMER_RESET', 'false');
    });
  }

  pos = 0;

  chatIcons = [
    { file: require('../assets/images/chat_question1.png') },
    { file: require('../assets/images/chat_question2.png') },
    { file: require('../assets/images/chat_question3.png') },
    { file: require('../assets/images/chat_question4.png') },
    { file: require('../assets/images/chat_question5.png') },
    { file: require('../assets/images/chat_question6.png') },
    { file: require('../assets/images/chat_question7.png') },
    { file: require('../assets/images/chat_responded.png') },
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

  challengeChitChat = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        console.log('userId iss: '+userId)
        console.log('Challenge ID iss: '+this.props.navigation.state.params.id)
        console.log('teamId ID iss: '+this.props.navigation.state.params.teamId)
        console.log('missionID ID iss: '+this.state.missionID)
        console.log('setImageAnswer iss: '+this.state.setChitChatAnswer)
        console.log('Reqest ID iss: '+this.state.requestIDChitChat)
        console.log('Reqest ID iss: '+this.state.selectedEitherOrOptions)
        this.setState({selectedEitherOrOptions: "["+this.state.selectedEitherOrOptions+"]"})
        console.log('selectedEitherOrOptions After ID iss: '+this.state.selectedEitherOrOptions)

        if(this.state.requestTypeChitChat === 'bubble') {
            data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDChitChat,type: "text",data: this.state.setChitChatAnswer,duration: "0"}});
        }else{
            data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDChitChat,type: "eitherOr",data: this.state.selectedEitherOrOptions.toString(),duration: "0"}});
        }

        console.log(123, data.data.challengeResponse_C);
        if(data.data.challengeResponse_C.length > 10){
          const requestId = this.state.requestIDChitChat;
          const targetIndex = this.state.challengeResponseDetail.requests.findIndex(r => r.id === requestId);
          let challengeResponseDetail = JSON.parse(JSON.stringify(this.state.challengeResponseDetail));
          challengeResponseDetail.requests[targetIndex].response = true;
          this.setState({ challengeResponseDetail: { ...challengeResponseDetail, requests: challengeResponseDetail.requests } });
          this.setState({showBubbleQuestion: false})
        }
      } catch (e) {
        console.log('Error in Challenge', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }

  challengeFoodCrazy = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        const data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDFoodCrazy ,type: "wordFit",data: this.state.setUpdatedArtBoard,duration: "0"}});
        if(data.data.challengeResponse_C.length > 10){
          this.setState({showChallengeArtboard: true})
        }
      } catch (e) {
        console.log('Error in Challenge', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }

  challengeEggToss = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        console.log('userId iss: '+userId)
        console.log('Challenge ID iss: '+this.props.navigation.state.params.id)
        console.log('teamId ID iss: '+this.props.navigation.state.params.teamId)
        console.log('missionID ID iss: '+this.state.missionID)
        console.log('Reqest ID iss: '+this.state.requestIDEggToss)
        console.log(161,JSON.stringify(this.state.selectedEggTossValues))
        let answerObject = {
          data: this.state.selectedEggTossValues
        }
        console.log(165,JSON.stringify(answerObject))

        const data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDEggToss ,data: JSON.stringify(answerObject)}});
        console.log(169, data.data.challengeResponse_C);
        if(data.data.challengeResponse_C.length > 10){
          this.props.navigation.goBack();
        }
      } catch (e) {
        console.log('Error in Challenge', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }

  challengeTimedHunt = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        const data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.challenge3Questions[this.state.challenge3CurrentIndex].id,type: "photo",data: this.state.setImageAnswer,duration: "121"}});
        if(data.data.challengeResponse_C.length > 10){
          if(this.state.challenge3CurrentIndex < (this.state.challenge3Questions.length - 1)){
              this.setState({challenge3CurrentIndex: this.state.challenge3CurrentIndex+1, isSetDefaultImage: true,setImageAnswer: '',});
              if(this.state.challenge3CurrentIndex == (this.state.challenge3Questions.length - 2)){
                  this.setState({btnTitle: "SUBMIT"});
              }
          }
        }
      } catch (e) {
        console.log('Error in signIn', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }

  challengeISpy = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        var userAnswer = JSON.stringify({
            "label":this.state.setPhotoLable,
            "url" : this.state.setImageAnswer
          })
        const data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.activeISpyQuestionID ,type:this.state.activeISpyQuestionType ,data: userAnswer }});

        if(data.data.challengeResponse_C.length > 10){
          const requestId = this.state.activeISpyQuestionID;
          const targetIndex = this.state.challengeResponseDetail.requests.findIndex(r => r.id === requestId);
          let challengeResponseDetail = JSON.parse(JSON.stringify(this.state.challengeResponseDetail));
          challengeResponseDetail.requests[targetIndex].response = true;
          this.setState({ challengeResponseDetail: { ...challengeResponseDetail, requests: challengeResponseDetail.requests }});
          this.setState({showChallenge4Question: false})
        }
      } catch (e) {
        console.log('Error in signIn', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }


  renderChallengeFour = challenge => {
    if (this.isChallengeTwoSetInState == false) {
      this.setState({
        challengeResponseDetail: challenge
      })
      this.isChallengeTwoSetInState = true;
    }
    if (this.state.challengeResponseDetail !== null)
    return (
      <Mutation mutation={ANSWER_CHALLENGE_I_SPY_MUTATION}>
        {(challengeResponse_C) => (
          <View  style={style.requestItemParent}>
            <View style={style.equestItemBg2}>
              {this.state.showChallenge4Question === false ?
                <Text style = {style.headingTextChallenge4}>CHOOSE ONE OF THE BELOW AND UPLOAD AN ASSOCIATED PHOTO</Text>
                :
                null
              }
              {this.state.showChallenge4Question === false ?
                <View style={style.iSpyGridView}>
                  {this.renderISpy(this.state.challengeResponseDetail)}
                </View>
                :
                <View>
                  <View style={style.bubbleQuestionView}>
                    <View style = {style.iSpyQuestionIconView}>
                      <Image
                        style={style.iSpyQuestionSetIcon}
                        source={{uri: this.state.activeISpyQuestionUrl}}
                      />
                      <Text style={style.iSpyQuestionSetText}>{this.state.activeISpyQuestionTitle}</Text>
                    </View>
                    <View style = {style.iSpyQuestionPicView}>
                      <View style={style.pictureViewBg1}>
                          <View style={style.promptPictureBg1}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this,-1)}>
                              <Image
                                  style={{
                                    width: 150,
                                    height: 150,
                                    marginRight: 15,
                                  }}
                                  source={this.state.isSetDefaultImage ? this.state.setImageFromLocal : this.state.setImageFromServer}
                                />
                              </TouchableOpacity>
                          </View>
                      </View>
                    </View>
                    <TextInput
                      style={style.inputPhotoLabelISpy}
                      placeholder="Photo Label"
                      onChangeText={(setPhotoLable) => this.setState({setPhotoLable})}
                      />
                  </View>
                </View>

              }
            </View>
            {this.state.showChallenge4Question === false ?
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>CANCEL</Text>
                  </TouchableOpacity>
              </View>
              :
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.setState({showChallenge4Question: false})} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.saveISpyAnswer(challengeResponse_C)} style = {style.touchableOpacityNextActive}>
                      <Text style={style.textShowPrompt}>SAVE</Text>
                  </TouchableOpacity>
              </View>
            }
          </View>
        )}
      </Mutation>

    )
  }

  renderChallengeThree = challenge => {
    return (
      challenge.requests.map((request,index) => {
        {
          if (request.type === 'prompt' && index == 0)
            return (
          <Mutation mutation={ANSWER_CHALLENGE_MUTATION}>
            {(challengeResponse_C) => (
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
                          <TouchableOpacity onPress={!this.state.stopwatchStart ? this.checkTimerStart : this.selectPhotoTapped.bind(this,-1)} >
                            <Image
                                style={{
                                  width: 150,
                                  height: 150,
                                }}
                                source={this.state.isSetDefaultImage ? this.state.setImageFromLocal : this.state.setImageFromServer}
                              />
                            </TouchableOpacity>
                        </View>
                    </View>
                  </View>
                </View>
                <View style= {style.optionNextCancelView}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                        <Text style={style.textShowPrompt}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.saveTimedHuntAnswer(index,challengeResponse_C)} style = {[this.state.stopwatchStart? style.touchableOpacityNextActive : style.touchableOpacityNextInactive]}>
                        <Text style={style.textShowPrompt}>{this.state.btnTitle}</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )}
          </Mutation>
            )
        }
      })
    )
  }

  renderChallengeFive = challenge => {
    return (
      <Mutation mutation={ANSWER_CHALLENGE_MUTATION}>
        {(challengeResponse_C) => (
          <View  style={style.requestItemParent}>
            <View style={[!this.state.showChallengeArtboard ? style.requestItemBg : style.requestItemBg1]}>
              {this.state.showChallengeArtboard === false ?
                <View style={style.foodCrazyParentView}>
                  {this.renderFieldFifth(challenge)}
                </View>
                :
                <View>
                    <View style={style.bubbleQuestionView}>
                      <Text style= {{color: "#0D0760",fontSize: 16}}>{this.state.setUpdatedArtBoard}</Text>
                    </View>
                </View>
              }
            </View>
            {this.state.showChallengeArtboard === false ?
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.generateArtBoardText(challenge, challengeResponse_C)} style = {style.touchableOpacityNextActive}>
                      <Text style={style.textShowPrompt}>GENERATE</Text>
                  </TouchableOpacity>
              </View>
              :
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>EXIT</Text>
                  </TouchableOpacity>
              </View>
            }
          </View>
        )}
      </Mutation>
    )
  }

  renderFieldFifth = challenge => {
    if (this.pos === 0) {
      let values = new Array(challenge.requests.length)
      for(let i = 0; i<values.length;i++){
          values[i] = "";
      }
      this.setState({selectedFoodCrazyValues: values})
      this.pos = 1
    }
    return (
      challenge.requests.map((request,index) => {
        {
          if (request.type === 'wordFit')
            return (
              <View key={request.id} style={style.foodCrazyChildRowView}>
                  <Text style={style.foodCrazyLabel}>{request.data}</Text>
                  <TextInput
                    key={request.id}
                    style={style.inputfoodCrazy}
                    onChangeText={(setChitChatAnswer) => this.setCrazyFoodOptionsValue(index,setChitChatAnswer)}
                  />
              </View>
            )
        }
      })
    )
  }

  setCrazyFoodOptionsValue(index, value){
      let values = this.state.selectedFoodCrazyValues
      values[index]= value
      this.setState({
        selectedFoodCrazyValues: values,
      })
  }

  renderChallengeOne = challenge => {
    return (
      <Mutation mutation={ANSWER_CHALLENGE_EGG_TOSS_MUTATION}>
        {(challengeResponse_C) => (
          <View  style={style.requestItemParent}>
            <View style={style.requestItemBg1}>
                <View style={style.eggTossParentView}>
                  {this.renderFieldsOne(challenge)}
                </View>
            </View>
            <View style= {style.optionNextCancelView}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                    <Text style={style.textShowPrompt}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.submitChallengeOneAnswers(challenge, challengeResponse_C)} style = {style.touchableOpacityNextActive}>
                    <Text style={style.textShowPrompt}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
          </View>
        )}
      </Mutation>
    )
  }

  renderFieldsOne = challenge => {
    if (this.pos === 0) {
      let answerObject = [];
      for(let i = 0; i < challenge.requests.length;i++){
        var eggTossAnswer = {
            "requestId":challenge.requests[i].id,
            "type" : challenge.requests[i].type,
            "data": ""
          }
          answerObject.push(eggTossAnswer);
      }
      this.setState({selectedEggTossValues: answerObject,isLoadChallengeOne: true});
      this.pos = 1;
    }
    return (
      challenge.requests.map((request,index) => {
        {
          if(request.type === 'text'){
              if(request.requestType === "none"){
                  return (
                    <View key={request.id} style={style.eggTossChildRowView100}>
                        <Text style={style.eggTossLabel}>{request.data}</Text>
                        <TextInput
                          key={request.id}
                          style={style.inputEggToss}
                          onChangeText={(setChitChatAnswer) => this.setEggTossOptionsValue(index,setChitChatAnswer)}
                        />
                    </View>
                  )
              }else{
                return (
                  <View key={request.id} style={style.eggTossChildRowView50Left}>
                      <Text numberOfLines={2} style={style.eggTossLabel}>{request.data}</Text>
                      <TextInput
                        key={request.id}
                        style={style.inputEggToss}
                        onChangeText={(setChitChatAnswer) => this.setEggTossOptionsValue(index,setChitChatAnswer)}
                      />
                  </View>
                )
              }
          }else{
            return (
              <View style = {{backgroundColor: '#B7BABC', width: "100%", height: 150,marginTop: 15,flexDirection: 'row',}}>
                <View style= {{width: 150,}}>
                    {!this.state.requestForVideo ?
                        <Image
                          style={{
                            width: 150,
                            height: 150,
                          }}
                          source={this.state.isSetDefaultImage ? this.state.setImageFromLocal : this.state.setImageFromServer}
                        />
                        :
                        <Video source={{uri: this.state.videoSource}}
                           ref={(ref) => {
                             this.player = ref
                           }}
                           onBuffer={this.onBuffer}
                           onError={this.videoError}
                           style={{
                             width: 150,
                             height: 150,
                           }}/>
                    }
                </View>
                <View style= {{width: 200,height: 150, flex: 1,justifyContent: 'center',flexDirection: 'column',alignItems: 'center',backgroundColor: 'white'}}>
                    <TouchableOpacity onPress={() => this.selectPhotoTapped(index)} style = {{
                      backgroundColor: 'blue',
                      width: "75%",
                      height: 30,
                      borderRadius: 5,
                      alignItems: 'center',
                      margin: 10,
                      justifyContent: 'center',
                    }}>
                        <Text style={style.textShowPrompt}>Upload Image</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.selectVideoTapped(index)} style = {{
                      backgroundColor: 'blue',
                      width: "75%",
                      height: 30,
                      borderRadius: 5,
                      alignItems: 'center',
                      margin: 10,
                      justifyContent: 'center',
                    }}>
                        <Text style={style.textShowPrompt}>Upload Video</Text>
                    </TouchableOpacity>
                </View>
              </View>
            )
          }
        }
      })
    )
  }

  setEggTossOptionsValue(index, value){
      console.log(562, this.state.selectedEggTossValues);
      console.log(563, this.state.selectedEggTossValues.length);
      let selectedEggTossValues = this.state.selectedEggTossValues;
      this.state.selectedEggTossValues[index].data = value;
      this.setState({ selectedEggTossValues: [...selectedEggTossValues]});
      console.log(565, this.state.selectedEggTossValues);
  }

  isChallengeTwoSetInState = false;
  renderChallengeTwo = challenge => {
    if (this.isChallengeTwoSetInState == false) {
      this.setState({
        challengeResponseDetail: challenge
      })
      this.isChallengeTwoSetInState = true;
    }
    if (this.state.challengeResponseDetail !== null)
    return (
      <Mutation mutation={ANSWER_CHALLENGE_MUTATION}>
        {(challengeResponse_C) => (
          <View  style={style.requestItemParent}>
            <View style={style.requestItemBg}>
              {this.state.showBubbleQuestion === false ?
                <Text style= {style.headingTextChallenge2}>CHOOSE A DOT TO COMPLETE OR EDIT</Text>
                :
                null
              }
              {this.state.showBubbleQuestion === false ?
                <View style={style.bubblesView}>
                  {this.renderBubbles(this.state.challengeResponseDetail)}
                </View>
                :
                <View>
                  <View style={style.bubbleQuestionView}>
                    <View style = {style.viewQuestionIconChallenge2}>
                      <Image style={style.iconImageQuestionChallenge2} source={this.chatIcons[this.state.activeChatItemId].file} />
                    </View>
                    <View style = {style.viewQuestionTextChallenge2}>
                      <Text style={style.questionChallenge2Text}>{this.state.activeBubbleQuestion}</Text>
                    </View>
                  </View>
                  {this.state.requestTypeChitChat === 'bubble' ?
                      <TextInput
                        style={style.inputChitChatAnswer}
                        placeholder="Please type answer here"
                        multiline = {true}
                        numberOfLines = {5}
                        onChangeText={(setChitChatAnswer) => this.setState({setChitChatAnswer})}
                      />
                      :
                      <View style={style.chitChatEitherOrParentView}>
                        {this.renderEitherOr(this.state.activeBubbledataObj.data)}
                      </View>
                    }
                </View>
              }
            </View>
            {this.state.showBubbleQuestion === false ?
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.props.navigation.goBack()} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>CANCEL</Text>
                  </TouchableOpacity>
              </View>
              :
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.setState({showBubbleQuestion: false})} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.saveChitChatAnswer(challengeResponse_C)} style = {style.touchableOpacityNextActive}>
                      <Text style={style.textShowPrompt}>SAVE</Text>
                  </TouchableOpacity>
              </View>
            }
          </View>
        )}
      </Mutation>
    )
  }

  renderBubbles = challenge => {
    let requestIcon = 0;
    return (
      challenge.requests.map((request, index) => {
        {
          if (request.type === 'bubble' || request.type === 'eitherOr') {
            return (
              <View style={style.chatItem} >
              {request.response == null ?
                  <TouchableHighlight key={"bubble_" + request.id} onPress={() => this.showChatQuestion(index, request.data,request.id,request.type,challenge.missionID, request.dataObj)}>
                    <View>
                      <Image style={style.chatIcons} source={this.chatIcons[requestIcon++].file} />
                    </View>
                  </TouchableHighlight>
                  :
                  <Image style={style.chatIcons} source={this.chatIcons[7].file} increaseIconCounter={requestIcon++} />
              }
              </View>
            )
          }
        }
      })
    )
  }

  renderEitherOr = data => {

    if (this.pos === 0) {
      let values = new Array(data.length)
      for(let i = 0; i<values.length;i++){
          values[i] = -1;
      }
      this.setState({selectedEitherOrOptions: values})
      this.pos = 1
    }

    return (
      data.map((request,index) => {
        {
          return (
            <View key={request.id} style={style.foodCrazyChildRowView}>
              <RadioGroup
                size={24}
                thickness={1}
                color='#0D0760'
                activeColor = '#0D0760'
                onSelect = {(select_index, value) => this.onSelect(index, value)}>
                    <RadioButton value={1} >
                      <Text style = {{color: '#0D0760', fontSize: 16,marginLeft: 10}}>{request.either}</Text>
                    </RadioButton>

                    <RadioButton value={2}>
                      <Text style = {{color: '#0D0760', fontSize: 16,marginLeft: 10}}>{request.or}</Text>
                    </RadioButton>
               </RadioGroup>
               <View style={{width: "100%",height: 1, backgroundColor: '#0D0760'}}/>
            </View>
          )
        }
      })
    )
  }

  onSelect(index, value){
      let values = this.state.selectedEitherOrOptions
      values[index]= value
      this.setState({
        selectedEitherOrOptions: values,
      })
  }

  renderISpy = challenge => {
    let requestIcon = 0;
    console.log(challenge.requests)
    return (
      challenge.requests.map((request, index) => {
        {
          return (
            <View style={style.iSpyImageOpacity}>
            {request.response == null ?
                <TouchableHighlight  onPress={() => this.showISpyQuestion(index, request.data, request.url,request.type,request.id,request.response)}>
                  <View style = {{width: "100%",padding: 4,}}>
                      <Image
                        style={style.iSpyActiveImageIcon}
                        source={{uri: this.state.challenge4Questions[index].url}}/>
                      <Text numberOfLines = { 1 } ellipsizeMode = 'tail' style={style.iSpyTitle}>{this.state.challenge4Questions[index].data}</Text>
                  </View>
                </TouchableHighlight>
                :
                <View style = {{width: "100%",padding: 4,position: 'relative'}}>
                    <Image
                      style={style.iSpyInActiveImageIcon}
                      source={{uri: this.state.challenge4Questions[index].url}}/>
                    <View style={style.iSpyInActiveView}/>
                    <Text numberOfLines = { 1 } ellipsizeMode = 'tail'  style={style.iSpyTitle} >{this.state.challenge4Questions[index].data}</Text>
                </View>
            }
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
      })

      for (var i = 0  ; i < this.state.challenge3Questions.length ; i++) {
          if(this.state.challenge3Questions[i].response == null){
            this.setState({ challenge3CurrentIndex: index});
          }else{
            index = index+1;
            this.setState({ challenge3CurrentIndex: index});
          }
      }

    }

  };

  submitChallengeOneAnswers = (challenge,challengeResponse_C)=> {
      let ar = [];
      ar.push(this.state.selectedEggTossValues)
      console.log(764, this.state.selectedEggTossValues);
      console.log(765, ar);
      var allValueSet = true;
      for(let i = 0; i<this.state.selectedEggTossValues.length;i++){
          console.log(769, this.state.selectedEggTossValues[i].data)
          if(this.state.selectedEggTossValues[i].data === ""){
            allValueSet = false;
            break;
          }
      }
      if(allValueSet){
        this.setState({requestIDEggToss: challenge.requests[0].id,missionID: challenge.missionID});
        this.challengeEggToss(challengeResponse_C);
      }else{
          alert("Please fill all values & upload image or video for option.")
      }
  };

  generateArtBoardText = (challenge,challengeResponse_C)=> {
      console.log(301, this.state.selectedFoodCrazyValues);
      console.log(768, challenge.artboardDetails);
      let updatedAetBoardValue = challenge.artboardDetails.toString();
      var allValueSet = true;
      for(let i = 0; i<this.state.selectedFoodCrazyValues.length;i++){
          if(this.state.selectedFoodCrazyValues[i] !== ""){
              var replacementString = '\\(Description #'+(i+1)+'\\)';
              var myRegExp = new RegExp(replacementString,'g');
              updatedAetBoardValue = updatedAetBoardValue.replace(myRegExp, this.state.selectedFoodCrazyValues[i]);
          }else{
            allValueSet = false;
          }
      }
      console.log(714, updatedAetBoardValue);
      if(allValueSet){
        this.setState({requestIDFoodCrazy: challenge.requests[0].id,setUpdatedArtBoard: updatedAetBoardValue, missionID: challenge.missionID});
        this.challengeFoodCrazy(challengeResponse_C);
      }else{
          alert("Please fill all values.")
      }

  };

  checkTimerStart = () => {
    alert('Please select image first.');
  };

  saveTimedHuntAnswer = (index,challengeResponse_C) => {
    if(this.state.stopwatchStart){
      if(!this.state.isSetDefaultImage){
          this.challengeTimedHunt(challengeResponse_C)
      }else{
        alert('Please select image first.');
      }
    }else{
      alert('Please start prompt first.');
    }
  };

  saveISpyAnswer = (challengeResponse_C) => {
    if(this.state.setImageAnswer.trim().length > 10){
        this.challengeISpy(challengeResponse_C)
    }else{
      alert('Please select image first.');
    }
  };

  saveChitChatAnswer = (challengeResponse_C) => {
    if(this.state.requestTypeChitChat === 'bubble') {
      if(this.state.setChitChatAnswer.trim().length > 0){
          this.challengeChitChat(challengeResponse_C)
      }else{
        alert('Please select image first.');
      }
    }else{
      var isSelectedAllOption = true;
      for(let i = 0; i<this.state.selectedEitherOrOptions.length;i++){
          if (this.state.selectedEitherOrOptions[i] === -1){
              isSelectedAllOption = false;
              break;
          }
      }
      if(isSelectedAllOption){
          this.challengeChitChat(challengeResponse_C)
      }else{
          alert("Please select all questions atleast one option");
      }
    }

  };

  loadPicture = async avatar => {
    console.log('Avatarr iss: '+avatar);
    let data = await axios.post('https://x5wrp2wop7.execute-api.us-east-1.amazonaws.com/production/', {
      base64String: avatar
    });
    console.log(192,data.data.Location);
    this.setState({
      setImageAnswer: data.data.Location,
    });

    if(this.state.isLoadChallengeOne){
      console.log(860,this.state.challengeOneCurrentIndex)
      this.setEggTossOptionsValue(this.state.challengeOneCurrentIndex, this.state.setImageAnswer);
    }
  }

  loadVideo = async video => {
     console.log('VideoUploading iss: '+"blob:"+video);
     const formData = new FormData();

     var file = new Blob([video],{"type" : "video/mp4"});
     var value = URL.createObjectURL(file);

     formData.append('file',{
       name: "videoplayback.mp4",
       preview: value,
       type: "video/mp4"
    });

    const response = await axios.post('http://ec2-54-234-174-200.compute-1.amazonaws.com/uploadChallengeResponses/', formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
       },
     });
     const url = response.data.Location;
     console.log(892,url);
  }

  setFoodCrazyAnswerValue = a => {
      foodCrazyAnswers = this.state.foodCrazyAnswers
      foodCrazyAnswers[a] = ''
      console.log(408, foodCrazyAnswers)
      this.setState({foodCrazyAnswers: foodCrazyAnswers})
  }

  showChatQuestion = (item, question,id,type,missionID,dataObj) => {
    console.log("challenge.missionID iss: "+missionID)
    this.setState({
      activeBubbleQuestion: question,
      showBubbleQuestion: true,
      activeChatItemId: item,
      requestTypeChitChat: type,
      requestIDChitChat: id,
      missionID: missionID,
      activeBubbledataObj: dataObj,
    })
  }

  showISpyQuestion = (item, question, url,type, requestID,response) => {
    console.log(907,url)
    if(response == null){
      this.setState({
        activeISpyQuestionTitle: question,
        showChallenge4Question: true,
        activeISpyItemId: item,
        activeISpyQuestionUrl: url,
        activeISpyQuestionType:type,
        activeISpyQuestionID: requestID,
        isSetDefaultImage: true,
        setImageAnswer: '',
      })
    }else{
      alert("You already answerd this question.")
    }

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
          missionID: challenge.missionID,
          challenge3Questions: challenge.requests
        })
      }
    }

    if (challenge.type == "4") {
      if (this.state.challenge4Questions != null) {
        return this.renderChallengeFour(challenge)
      } else {
        this.setState({
          missionID: challenge.missionID,
          challenge4Questions: challenge.requests
        })
      }
    }
    if (challenge.type == "5") {
      return this.renderChallengeFive(challenge)
    }
  }
  render() {
    const id = this.props.navigation.state.params.id;
    return (
      <KeyboardAwareScrollView>
      <ScrollView>
        <View>
          <Query query={GET_CHALLENGE} variables={{ challengeId: id,teamId: this.props.navigation.state.params.teamId }} fetchPolicy="network-only">
            {({ data: { challenge_Team }, loading }) => {
              if (loading || !challenge_Team) {
                return <Text>Loading ...</Text>;
              }
              {
                return (
                  <View style={style.challenge}>
                    <View style={style.challengeInfo}>
                      <View style={style.challengeStrip}>
                        <View style={style.challengeTitleView}>
                          <Text style={style.challengeTitle}>{challenge_Team.title}</Text>
                          <View style={style.challengePointsView}>
                            <Text style={style.challengePoints}>{challenge_Team.pctDone} Pts</Text>
                          </View>
                        </View>
                      </View>
                      <View style={style.challengeDetailsView}>
                        <View style={style.challengeBasicInfo}>
                          <Text style={style.challengeDetailsLabel}>
                            Available Points:
                            <Text style={style.challengeDetailsValue}> {challenge_Team.maxPts}</Text>
                          </Text>
                          <Text style={style.challengeDetailsLabel}>
                            Materials:
                            <Text style={style.challengeDetailsValue}> {challenge_Team.materials}</Text>
                          </Text>
                        </View>
                        <View style={style.challengeInfoView}>
                          {
                            challenge_Team.description.map(desc => {
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
                            challenge_Team.description.map(desc => {
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
                            challenge_Team.description.map(desc => {
                              if (desc.type === "textOverlay")
                                return (
                                  <TouchableHighlight onPress={() => this.loadInstructions(desc.data, 'textOverlay')}>
                                    <View style={style.challegeInfoIconsView}>
                                      <Image style={style.challegeInfoIcons} source={require('../assets/images/info.png')} />
                                    </View>
                                  </TouchableHighlight>
                                )
                            })}
                        </View>
                      </View>
                      {
                        challenge_Team.description.map(desc => {
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
                        this.renderChallengeResponseForm(challenge_Team)
                      }
                    </View>
                  </View>
                );
              }
            }}
          </Query>
        </View>
      </ScrollView>
      </KeyboardAwareScrollView>
    );
  }

  selectPhotoTapped(index) {
    this.setState({isRequestForImage: true,challengeOneCurrentIndex: index})
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      },
    };
    this.openCamera(options);
  }

  selectVideoTapped(index) {
    this.setState({isRequestForImage:false,challengeOneCurrentIndex: index})
    const options  = {
        title: 'Video Picker',
        takePhotoButtonTitle: 'Take Video...',
        mediaType: 'video',
        videoQuality: 'medium'
      };
      this.openCamera(options);
  }

  openCamera(options) {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled video picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        if(this.state.isRequestForImage){
          let source = response.data;
          let imagePath = { uri: 'data:image/jpeg;base64,' + response.data} ;
          this.setState({
            isSetDefaultImage: false,
            setImageFromServer: imagePath,
            requestForVideo: false,
          });
          if (source) {
            this.loadPicture(source)
          }
        }else {
          console.log(1115, response);
          this.setState({
            videoSource: response.uri,
            requestForVideo: true,
          });
          console.log(1118, this.state.videoSource);
          if (response.uri) {
            this.loadVideo(response.uri)
          }
        }
      }
    });
  }

}
