import React, { Component } from 'react';
import { View, TouchableHighlight, TouchableOpacity, Modal,StatusBar, AsyncStorage, WebView, Image, ScrollView, TextInput, KeyboardAvoidingView} from 'react-native';
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
import ProgressLoader from '../loader/ProgressLoader';
import styleLoader from '../loader/progressbar_style';

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
      eggTossItemType: "photo",
      isPhotoVideoUploading: false,
      isReloadDashboard: false,
      showChatLoader: false,
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
    { file: require('../assets/images/gray_circle.png') },
    { file: require('../assets/images/right_icon.png') },
  ]

 static navigationOptions = ({ navigation: { navigate, state } }) => ({
    tabBarVisible: false,
    title: state.params.missionTitle,
    headerMode: 'screen',
    headerTintColor: Color.white,
    headerStyle: {
      backgroundColor: Color.transparent
    },
    headerBackground: (
      <Image
        style={{width: "100%",height: 75,}}
        source={require('../assets/images/header_bg.png')}
      />
    ),
  });

  // navigationOptions = {
  //   header: null,
  //   headerMode: 'none',
  //   tabBarVisible: false,
  // };


  loadInstructions = (data, type) => {
    this.props.navigation.navigate('instructions', {
      missionTitle: this.props.navigation.state.params.missionTitle,
      type: type,
      data: data
    })
  }

  //Comman this

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
    console.log(168,this.props.navigation);
    return (
      <KeyboardAwareScrollView style={style.scrollStyleChallengeBlue}>
        <View>
          <Query query={GET_CHALLENGE} variables={{ challengeId: id,teamId: this.props.navigation.state.params.teamId }} fetchPolicy="network-only">
            {({ data: { challenge_Team }, loading }) => {
              if (loading || !challenge_Team) {
                return <Text>Loading ...</Text>;
              }
              {
                return (
                  <View style={style.challenge}>
                    <View style={style.challengeSpaceView}>
                        <View style={style.challengeStrip}>
                          <Image
                            style={{width: "100%",height: 60,borderRadius: 10,resizeMode: 'stretch'}}
                            source={require('../assets/images/challenge_details_heading_bg.png')}
                          />
                          <View style={{width: "100%",height: 60 ,flexDirection: 'row',position:'absolute',top:0,}}>
                            <View style={{width: "75%",justifyContent: 'center',flexDirection: 'row',position:'relative'}}>
                                <Image
                                  style={{width: "100%",height: 60,borderRadius: 10,resizeMode: 'stretch',position:'absolute',top:0,}}
                                  source={require('../assets/images/trasparent_strip_challenge_details.png')}
                                />

                                <Text style={{width: "60%",fontSize: 14, alignSelf: 'center',fontWeight: 'bold', color: 'white',marginLeft: 20}}>{challenge_Team.title} Pts</Text>
                                <View style = {{width: "40%",justifyContent: 'flex-end',flexDirection: 'row',padding: 10,alignItems: 'center'}}>
                                  {
                                   challenge_Team.description.map(desc => {
                                     if (desc.type === "videoOverlay")
                                       return (
                                         <TouchableHighlight onPress={() => this.loadInstructions(desc.url, 'videoOverlay')}>
                                             <Image
                                               style={{width: 15,height: 15,resizeMode: 'contain',alignSelf: 'center'}}
                                               source={require('../assets/images/video_icon.png')}
                                             />
                                         </TouchableHighlight>
                                       )
                                   })}
                                   {
                                     challenge_Team.description.map(desc => {
                                       if (desc.type === "audioOverlay")
                                         return (
                                           <TouchableHighlight onPress={() => this.loadInstructions(desc.url, 'audioOverlay')}>
                                               <Image
                                                 style={{width: 15,height: 15,resizeMode: 'contain',alignSelf: 'center',marginLeft: 5}}
                                                 source={require('../assets/images/audio_icon.png')}
                                               />
                                           </TouchableHighlight>
                                         )
                                     })}
                                     {
                                       challenge_Team.description.map(desc => {
                                         if (desc.type === "textOverlay")
                                           return (
                                             <TouchableHighlight onPress={() => this.loadInstructions(desc.data, 'textOverlay')}>
                                             <Image
                                               style={{width: 15,height: 15,resizeMode: 'contain',alignSelf: 'center',marginLeft: 5}}
                                               source={require('../assets/images/info_icon.png')}
                                             />
                                             </TouchableHighlight>
                                           )
                                       })}
                                </View>
                            </View>
                            <View style={{width: "25%",justifyContent: 'center'}}>
                                <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white',alignSelf: 'center',textAlign: 'right'}}>{challenge_Team.pctDone} Pts</Text>
                            </View>
                          </View>
                        </View>
                        {
                          challenge_Team.description.map(desc => {
                            if (desc.type === "text")
                            return (
                              <View key={desc.id} style={style.challengeDetailsView}>
                                <View style={style.challengeDescriptionView}>
                                  <ScrollView style={{padding: 10}} keyboardShouldPersistTaps='handled'>
                                    <Text style={style.challengeDetailsLabel}>
                                      Available Points:
                                      <Text style={style.challengeDetailsValue}> {challenge_Team.maxPts}</Text>
                                    </Text>
                                    <Text style={style.challengeDetailsLabel}>
                                      Materials:
                                      <Text style={style.challengeDetailsValue}> {challenge_Team.materials}</Text>
                                    </Text>
                                    <Text style={style.challengeDetailsLabel}>
                                      Details:
                                      <Text style={style.challengeDescription}>{desc.data}</Text>
                                    </Text>
                                  </ScrollView>
                                </View>
                              </View>
                            )
                        })}
                        <View style={style.challengeResponse}>
                          {
                            this.renderChallengeResponseForm(challenge_Team)
                          }
                        </View>
                        <Modal
                          animationType="fade"
                          transparent={true}
                          visible={this.state.showChatLoader}
                          onRequestClose = {() => {
                             this.setState({showChatLoader: false});
                          }}
                          style = {styleLoader.loaderMoedl}>
                              <ProgressLoader />
                        </Modal>
                    </View>

                  </View>
                );
              }
            }}
          </Query>
        </View>
      </KeyboardAwareScrollView>
    );
  }


  //END Comman Details


  //Challenge One Details Start

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
            <View style= {style.optionNextCancelCenterView}>
                <TouchableHighlight style={style.submitStyle} onPress={() => this.submitChallengeOneAnswers(challenge, challengeResponse_C)}>
                  <Text style={style.submitText}>Submit</Text>
                </TouchableHighlight>
                <TouchableHighlight style={style.cancelStyle} onPress={() => this.onBack() }>
                  <Text style={style.cancelText}>Cancel</Text>
                </TouchableHighlight>
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
                        <TextInput
                          key={request.id}
                          style={style.inputEggToss}
                          placeholder = {request.data}
                          onChangeText={(setChitChatAnswer) => this.setEggTossOptionsValue(index,setChitChatAnswer)}
                        />
                    </View>
                  )
              }else{
                return (
                  <View key={request.id} style={style.eggTossChildRowView50Left}>
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
              <View style = {{backgroundColor: '#FFFFFF', width: "100%", height: 150,marginTop: 15,flexDirection: 'row',}}>
                <View style= {{width: 150,position:'relative'}}>

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
                    <Text style={{color: 'rgb(112,112,112)', fontSize: 12,marginTop: 70, alignSelf: 'center',position:'absolute',top:0}}>Preview</Text>
                </View>
                <View style= {{width: 250,height: 150, flex: 1,justifyContent: 'center',flexDirection: 'column',alignItems: 'center'}}>
                    <View style = {{width: '90%',paddingLeft:5,paddingRight:5, paddingTop: 15,paddingBottom: 15,backgroundColor: '#fff',borderWidth: 1,borderRadius: 1,borderColor: 'rgb(112,112,112)',}}>
                      <Text style={{color: 'rgb(137,137,137)', fontSize: 12, paddingLeft: 3,paddingRight: 3}}>Photo Description</Text>//{request.data}
                    </View>
                    <View style = {{width: '95%',flexDirection: 'row', alignItems: 'center',marginTop:20}}>
                      <TouchableOpacity onPress={() => this.selectPhotoTapped(index)} style = {{
                        backgroundColor: 'white',
                        width: "50%",
                        height: 30,
                        borderRadius: 50,
                        borderColor: '#1365A7',
                        borderWidth:1,
                        padding:5,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#1365A7',fontWeight: 'bold',fontSize: 12}}>+ Add photo</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.selectVideoTapped(index)} style = {{
                        backgroundColor: 'white',
                        width: "50%",
                        height: 30,
                        marginLeft:5,
                        borderRadius: 50,
                        borderColor: '#1365A7',
                        borderWidth:1,
                        padding:5,
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#1365A7',fontWeight: 'bold',fontSize: 12}}>+ Add video</Text>
                      </TouchableOpacity>
                    </View>
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
      if(this.state.selectedEggTossValues[index].type !== 'text'){
          this.state.selectedEggTossValues[index].type = this.state.eggTossItemType;
      }
      this.setState({ selectedEggTossValues: [...selectedEggTossValues]});
      console.log(565, this.state.selectedEggTossValues);
  }

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
      if(this.state.isPhotoVideoUploading){
          alert('Please wait while uploading image or video.');
      }else{
        if(allValueSet){
          this.setState({requestIDEggToss: challenge.requests[0].id,missionID: challenge.missionID});
          this.challengeEggToss(challengeResponse_C);
        }else{
            alert("Please fill all values & upload image or video for option.")
        }
      }
  };

  challengeEggToss = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        let answerObject = {
          data: this.state.selectedEggTossValues
        }
        const data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDEggToss ,data: JSON.stringify(answerObject)}});
        if(data.data.challengeResponse_C.length > 10){
          this.state.isReloadDashboard = true
          this.setState({showBubbleQuestion: false,showChallengeArtboard: true,showChallenge4Question: true})
          this.onBack();
        }
      } catch (e) {
        console.log('Error in Challenge', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
      }
  }

 //End Challenge One Details


//Challenge two start Details

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
              <Text style= {style.headingTextChallenge2}>Answer questions inside each dot to complete this Task</Text>
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
                    <Image style={style.iconImageQuestionChallenge2} source={this.chatIcons[0].file} />
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
                      value={this.state.setChitChatAnswer}
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
            <View style= {style.optionNextCancelCenterView}>
                <TouchableOpacity style = {style.submitStyle} onPress={() => this.onBackChitChat() }>
                    <Text style={style.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
            :
            <View style= {style.optionNextCancelCenterView}>
                <TouchableOpacity style = {style.submitStyle} onPress={() => this.setState({showBubbleQuestion: false})}>
                    <Text style={style.submitText}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {style.submitStyle} onPress={() => this.saveChitChatAnswer(challengeResponse_C)}>
                    <Text style={style.submitText}>SAVE</Text>
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
                <TouchableHighlight key={"bubble_" + request.id} onPress={() => this.showChatQuestion(index, request.data,request.id,request.type,challenge.missionID, request.dataObj, request.response)}>
                  <View style = {{position: 'relative',alignItems: 'center',justifyContent: 'center'}}>
                    <Image style={style.chatIcons} source={this.chatIcons[0].file} /> //requestIcon++
                    <Text style = {{position: 'absolute',alignSelf: 'center',textAlign: 'center', fontSize:15,fontWeight:'bold',color: '#61037C'}}>Q{requestIcon++}</Text>
                  </View>
                </TouchableHighlight>
                :
                <TouchableHighlight key={"bubble_" + request.id} onPress={() => this.showChatQuestion(index, request.data,request.id,request.type,challenge.missionID, request.dataObj, request.response)}>
                  <View style = {{position: 'relative',alignItems: 'center',justifyContent: 'center'}}>
                    <Image style={style.chatIcons} source={this.chatIcons[0].file} increaseIconCounter={requestIcon++} />
                    <Image style={style.chatIconsRight} source={this.chatIcons[1].file}/>
                  </View>
                </TouchableHighlight>
            }
            </View>
          )
        }
      }
    })
  )
}

renderEitherOr = data => {
  let values = null;
  if (this.pos === 0) {
    values = new Array(data.length)
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

challengeChitChat = async targetMutation => {
    try {
      var userId = await AsyncStorage.getItem('USER');
      this.setState({selectedEitherOrOptions: "["+this.state.selectedEitherOrOptions+"]"})
      let objResponse = null;
      if(this.state.requestTypeChitChat === 'bubble') {
           data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDChitChat,type: "text",data: this.state.setChitChatAnswer,duration: "0"}});
           objResponse = {
            "type": "text",
            "data": this.state.setChitChatAnswer
          }
      }else{
        objResponse = {
         "type": "eitherOr",
         "data": this.state.selectedEitherOrOptions
       }
       data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDChitChat,type: "eitherOr",data: this.state.selectedEitherOrOptions.toString(),duration: "0"}});
      }
      if(data.data.challengeResponse_C.length > 10){
        const requestId = this.state.requestIDChitChat;
        const targetIndex = this.state.challengeResponseDetail.requests.findIndex(r => r.id === requestId);
        let challengeResponseDetail = JSON.parse(JSON.stringify(this.state.challengeResponseDetail));
        challengeResponseDetail.requests[targetIndex].response = objResponse;
        this.setState({ challengeResponseDetail: { ...challengeResponseDetail, requests: challengeResponseDetail.requests } });
        this.state.isReloadDashboard =  true
        this.onBack();
      }
    } catch (e) {
      console.log('Error in Challenge', { graphQLErrors: e.graphQLErrors, networkError: e.networkError, message: e.message, extraInfo: e.extraInfo });
    }
}

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

//Challenge two END Details



  challengeFoodCrazy = async targetMutation => {
      try {
        var userId = await AsyncStorage.getItem('USER');
        const data = await targetMutation({ variables: {userID: userId ,missionID: this.state.missionID ,challengeID: this.props.navigation.state.params.id , teamId: this.props.navigation.state.params.teamId, requestID: this.state.requestIDFoodCrazy ,type: "wordFit",data: this.state.setUpdatedArtBoard,duration: "0"}});
        if(data.data.challengeResponse_C.length > 10){
          this.state.isReloadDashboard = true
          this.onBack();
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
              this.setState({challenge3CurrentIndex: this.state.challenge3CurrentIndex+1, isSetDefaultImage: true,setImageAnswer: ''});
              this.state.isReloadDashboard = true
              if(this.state.submitFinalAnswerForTimedHunt){
                  this.onBackChitChat();
              }
              if(this.state.challenge3CurrentIndex == (this.state.challenge3Questions.length - 1)){
                  this.setState({btnTitle: "SUBMIT"})
              }else{
                this.state.submitFinalAnswerForTimedHunt = false
              }
          }else{
            this.state.submitFinalAnswerForTimedHunt = true
            if(this.state.submitFinalAnswerForTimedHunt){
                this.onBackChitChat();
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

          let responseObj = {
              "type": this.state.activeISpyQuestionType,
              "data": userAnswer
          }
          const requestId = this.state.activeISpyQuestionID;
          const targetIndex = this.state.challengeResponseDetail.requests.findIndex(r => r.id === requestId);
          let challengeResponseDetail = JSON.parse(JSON.stringify(this.state.challengeResponseDetail));
          challengeResponseDetail.requests[targetIndex].response = responseObj;
          this.setState({ challengeResponseDetail: { ...challengeResponseDetail, requests: challengeResponseDetail.requests }});
          this.setState({showChallenge4Question: false,})
          this.state.isReloadDashboard = true
          this.onBack();
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
                                  source={this.state.isSetDefaultImage ? this.state.setImageFromLocal : {uri: this.state.setImageAnswer} }
                                />
                              </TouchableOpacity>
                          </View>
                      </View>
                    </View>
                    <TextInput
                      style={style.inputPhotoLabelISpy}
                      placeholder="Photo Label"
                      value={this.state.setChitChatAnswer}
                      onChangeText={(setPhotoLable) => this.setState({setPhotoLable})}
                      />
                  </View>
                </View>

              }
            </View>
            {this.state.showChallenge4Question === false ?
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.onBackChitChat() } style = {style.touchableOpacityCancelOption}>
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
                    <TouchableOpacity onPress={() => this.onBackChitChat()} style = {style.touchableOpacityCancelOption}>
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
                  <TouchableOpacity onPress={() => this.onBack()} style = {style.touchableOpacityCancelOption}>
                      <Text style={style.textShowPrompt}>CANCEL</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.generateArtBoardText(challenge, challengeResponse_C)} style = {style.touchableOpacityNextActive}>
                      <Text style={style.textShowPrompt}>GENERATE</Text>
                  </TouchableOpacity>
              </View>
              :
              <View style= {style.optionNextCancelView}>
                  <TouchableOpacity onPress={() => this.onBack() } style = {style.touchableOpacityCancelOption}>
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
      console.log(431, challenge.requests.length);
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



  onBackChitChat(){
    if(this.state.isReloadDashboard){
      this.props.navigation.state.params.onGoBack();
      this.props.navigation.goBack();
    }else{
      this.props.navigation.goBack();
    }
  }

  onBack(){
    console.log(509, this.state.showChallenge4Question);
    if(this.state.isReloadDashboard){
      if(this.state.showBubbleQuestion){
        this.setState({showBubbleQuestion: false})
      }else if(!this.state.showChallengeArtboard){
        this.setState({showChallengeArtboard: true})
      }else if(!this.state.showChallenge4Question){
        this.setState({showChallenge4Question: false})
      }else{
        this.props.navigation.state.params.onGoBack();
        this.props.navigation.goBack();
      }
    }else{
      this.props.navigation.goBack();
    }
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
                <TouchableHighlight  onPress={() => this.showISpyQuestion(index, request.data, request.url,request.type,request.id,request.response)}>
                  <View style = {{width: "100%",padding: 4,position: 'relative'}}>
                      <Image
                        style={style.iSpyInActiveImageIcon}
                        source={{uri: this.state.challenge4Questions[index].url}}/>
                      <View style={style.iSpyInActiveView}/>
                      <Text numberOfLines = { 1 } ellipsizeMode = 'tail'  style={style.iSpyTitle} >{this.state.challenge4Questions[index].data}</Text>
                  </View>
                </TouchableHighlight>
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


  generateArtBoardText = (challenge,challengeResponse_C)=> {
      let updatedArtBoardValue = challenge.artboardDetails.toString();
      var allValueSet = true;
      for(let i = 0; i<this.state.selectedFoodCrazyValues.length;i++){
          if(this.state.selectedFoodCrazyValues[i] !== ""){
            var replacementString = '\\(Description #'+(i+1)+'\\)';
            var myRegExp = new RegExp(replacementString,'g');
            updatedArtBoardValue = updatedArtBoardValue.replace(myRegExp, this.state.selectedFoodCrazyValues[i]);
          }else{
            allValueSet = false;
          }
      }
      console.log(809, updatedArtBoardValue);

      if(allValueSet){
        this.setState({requestIDFoodCrazy: challenge.requests[0].id, setUpdatedArtBoard: updatedArtBoardValue, missionID: challenge.missionID});
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
      if(this.state.isPhotoVideoUploading){
          alert('Please wait while uploading image.');
      }else{
        if(!this.state.isSetDefaultImage){
            this.challengeTimedHunt(challengeResponse_C)
        }else{
          alert('Please select image first.');
        }
      }
    }else{
      alert('Please start prompt first.');
    }
  };

  saveISpyAnswer = (challengeResponse_C) => {
    if(this.state.isPhotoVideoUploading){
        alert('Please wait while uploading image.');
    }else{
      if(this.state.setImageAnswer.trim().length > 10){
          this.challengeISpy(challengeResponse_C)
      }else{
        alert('Please select image first.');
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
      isPhotoVideoUploading: false,
      setImageAnswer: data.data.Location,
    });

    if(this.state.isLoadChallengeOne){
      console.log(860,this.state.challengeOneCurrentIndex)
      this.setEggTossOptionsValue(this.state.challengeOneCurrentIndex, this.state.setImageAnswer);
    }
  }

  loadVideo = async video => {
     const formData = new FormData();
     if (video.fileName) {
       formData.append("file", {
         name: video.fileName.split(".")[0],
         type: video.fileName.split(".")[1],
         uri: video.uri
       });
     } else {
       formData.append("file", {
         name: video.uri.split(".")[0],
         type: video.uri.split(".")[1],
         uri: video.uri
       });
     }

    const response = await axios.post('http://54.234.174.200:3000/uploadChallengeResponses/', formData, {
       headers: {
         Accept: 'application/json',
         'Content-Type': 'multipart/form-data;',
       },
     });

     if(response.data.Location.length > 10){
       this.setState({isPhotoVideoUploading: false,showChatLoader: false});
       this.setEggTossOptionsValue(this.state.challengeOneCurrentIndex, response.data.Location);
     }else{
       alert("Error on uploading video file!Please try later.");
       this.setState({showChatLoader: false});
     }
  }

  setFoodCrazyAnswerValue = a => {
      foodCrazyAnswers = this.state.foodCrazyAnswers
      foodCrazyAnswers[a] = ''
      console.log(408, foodCrazyAnswers)
      this.setState({foodCrazyAnswers: foodCrazyAnswers})
  }

  showChatQuestion = (item, question,id,type,missionID,dataObj,response) => {

    if(response !== null){
        if(response.type === 'text'){
          this.setState({setChitChatAnswer: response.data, selectedEitherOrOptions: null})
        }else{
            this.setState({setChitChatAnswer: '', selectedEitherOrOptions: "response.data"})
        }
        console.log(954, this.state.selectedEitherOrOptions);
    }else{
        this.setState({setChitChatAnswer: ''})
    }
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
    if(response !== null){
      let jsonObject = JSON.parse(response.data)
      this.setState({
          isSetDefaultImage: false,
          setImageAnswer: jsonObject.url,
          setChitChatAnswer: jsonObject.label
      });
    }else{
      this.setState({
          isSetDefaultImage: true,
          setImageAnswer: '',
          setChitChatAnswer: '',
      });
    }

    this.setState({
      activeISpyQuestionTitle: question,
      showChallenge4Question: true,
      activeISpyItemId: item,
      activeISpyQuestionUrl: url,
      activeISpyQuestionType:type,
      activeISpyQuestionID: requestID,
    })

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
            eggTossItemType: "photo",
            isPhotoVideoUploading: true,
          });
          if (source) {
            this.loadPicture(source)
          }
        }else {
          console.log(1115, response);
          this.setState({
            videoSource: response.uri,
            requestForVideo: true,
            eggTossItemType: "video",
            isPhotoVideoUploading: true,
          });
          console.log(1118, this.state.videoSource);

          if (response.uri) {
            this.setState({showChatLoader: true})
            this.loadVideo(response)
          }
        }
      }
    });
  }

}
