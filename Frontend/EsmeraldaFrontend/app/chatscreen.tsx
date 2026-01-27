import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';

import { useAudioPlayer } from 'expo-audio';
import { Image } from 'expo-image';
import * as Speech from 'expo-speech';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagePickerExample from './customComponents/pickImage';
import SoundRec from './customComponents/recordAudio';
import SendMessage from './fetchReqs/sendRequests';
export function ChatScreen() {

  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [imageUrl, setImageUrl] = useState([])
  const [audioUrl, setAudioUrl] = useState([])
  const [data, setData] = useState([])
  const [msgID, setMsgID] = useState(1)
  const insets = useSafeAreaInsets()

  // If you have a tab bar, include its height
  const tabbarHeight = 50
  const keyboardTopToolbarHeight = Platform.select({ ios: 44, default: 0 })
  const keyboardVerticalOffset = insets.bottom + tabbarHeight + keyboardTopToolbarHeight
  const audioMsg = (props=>{
   
    const player = useAudioPlayer(props.currentMessage.audioFile);
    return(
      <View style={{flex:1, flexDirection:'row', justifyContent:'space-between', paddingHorizontal:10, paddingVertical:5 }}>
          <Entypo style={{paddingRight:2.5}} name="sound" size={18} color="white" onPress={()=> {
             console.log(props.currentMessage.audioFile)
            player.play()}} />
          <View><Text style={{fontSize:14, paddingLeft:2.5, color:'white'}}>Play audio</Text></View>
      </View>
     
     
      
    )
   
  })
  const imageMsg = (props =>{
    const player = useAudioPlayer(props.currentMessage.audioFile);
    return(
        <View style={{flexDirection:'column',height:'auto', maxHeight:164
        }} >
           
            <Image
                  style={{width:props.currentMessage.width, height:props.currentMessage.height, backgroundColor:'white',maxWidth:256,maxHeight:144, borderTopLeftRadius:8, borderTopRightRadius:8}}
                  source= {{uri:props.currentMessage.imageUri}}
                  
                  contentFit="cover"
                  transition={1000}
                />
                {props.currentMessage.audioFile!= undefined&&
                
                  <View style={{ flexDirection:'row',width:'100%', paddingHorizontal:10, paddingVertical:5}}>
                    <Entypo style={{paddingRight:2.5}} name="sound" size={18} color="white" onPress={()=> {player.play()}} />
                     <Text style={{fontSize:14, paddingLeft:2.5, color:'white'}}>Play audio</Text>
                  </View>
                
                }
                
               
        </View>
    );
   
  })
  const ChatToolbar = (props) => {
    const [inputText, setInputText] = useState("");
    const [isSpeaking, setIsSpeaking] =  useState(false);
    if(Platform.OS === 'web'){
       return (
    <View
      pointerEvents="box-none"
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        height: 'auto',
        width:'100%',
        backgroundColor: "#111",
      }}
    >

      {/* TEXT INPUT */}
      {imageUrl.length>0 ? (
       
        <View style={{ flexDirection: "column", flex:1, flexWrap:"nowrap", flexShrink:1}}>
          <Image style={{width:50, height:50,maxWidth:256,maxHeight:144,marginBottom:2}}
                  source= {{uri:imageUrl[0]}}
                  
                  contentFit="cover"
                  transition={1000}></Image>
          
          <View style={{ flexDirection: "row", marginLeft: 10}}>
            <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: 20,
                  outline:"none",
                  borderColor: 'transparent',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  minHeight:10
                }}
                onFocus={()=>{}}
                placeholder="Image Added!"
                placeholderTextColor="#888"
                
                value={inputText}
                onChangeText={ setInputText}
              />
            {/* Image */}
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
        
          {/* Image */}
          <ImagePickerExample state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl ={setImageUrl}/>
          {/* Mic */}
          <SoundRec state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl={setImageUrl} imageUrl={imageUrl}/>
          

          {/* Emoji */}
          

          {/* Send */}
          <TouchableOpacity
            style={{marginLeft:10}}
            onPress={() => { if (inputText.trim().length > 0) {
           
                onSend([{ text: inputText, createdAt: new Date(), _id: Date.now(), user: { _id: 1 } }]);
                setInputText(""); // clear text
              }}}
          >
            <Feather name="send" size={24} color="#ffffffff" />
          </TouchableOpacity>

        </View>

          </View>
        </View>
       
      ):
      (
        
          <View style={{ flexDirection: "row", flex:1}}>
          <TextInput
        style={{
        
          flex: 1,
          backgroundColor: "#222",
          color: "white",
          minWidth:'75%',
          borderRadius: 20,
          outline:"none",
          borderColor: 'transparent',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        onFocus={()=>{}}
        placeholder="Type a message!"
        placeholderTextColor="#888"
        
        value={inputText}
        onChangeText={ setInputText}
      />
       <View style={{ flexDirection: "row", alignItems: "center"}}>
        
          {/* Image */}
          <ImagePickerExample state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl ={setImageUrl}/>
          {/* Mic */}
               <SoundRec state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl={setImageUrl} imageUrl={imageUrl}/>
          

          {/* Emoji */}
          

          {/* Send */}
          <TouchableOpacity
            style={{ marginLeft: 10, minWidth:'5%'}}
            onPress={() => { if (inputText.trim().length > 0) {
                onSend([{ text: inputText, createdAt: new Date(), _id: Date.now(), user: { _id: 1 } }]);
                setInputText(""); // clear text
              }}}
          >
            <Feather name="send" size={24} color="#ffffffff" />
          </TouchableOpacity>

        </View>
        </View>
       
        
      )
      }
      

      {/* ACTION BUTTONS (ALL ON RIGHT) */}
      
    </View>
  );
    }
    else{
      return (
    <View
      pointerEvents="box-none"
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        height: 'auto',
        width:'100%',
        paddingBottom:insets.bottom,
        backgroundColor: "#111",
      }}
    >

      {/* TEXT INPUT */}
      {imageUrl.length>0 ? (
       
        <View style={{ flexDirection: "column", flex:1, flexWrap:"nowrap", flexShrink:1}}>
          <Image style={{width:50, height:50,maxWidth:256,maxHeight:144,marginBottom:2}}
                  source= {{uri:imageUrl[0]}}
                  
                  contentFit="cover"
                  transition={1000}></Image>
          
          <View style={{ flexDirection: "row", marginLeft: 10}}>
            <TextInput
                style={{
                  flex: 1,
                  backgroundColor: "#222",
                  color: "white",
                  borderRadius: 20,
                  outline:"none",
                  borderColor: 'transparent',
                  paddingHorizontal: 12,
                  paddingVertical: 8,
                  minHeight:10
                }}
                onFocus={()=>{}}
                placeholder="Image Added!"
                placeholderTextColor="#888"
                
                value={inputText}
                onChangeText={ setInputText}
              />
            {/* Image */}
                <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 10 }}>
        
          {/* Image */}
          <ImagePickerExample state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl ={setImageUrl}/>
          {/* Mic */}
          <SoundRec state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl={setImageUrl} imageUrl={imageUrl}/>
          

          {/* Emoji */}
          

          {/* Send */}
          <TouchableOpacity
            style={{marginLeft:10}}
            onPress={() => { if (inputText.trim().length > 0) {
           
                onSend([{ text: inputText, createdAt: new Date(), _id: Date.now(), user: { _id: 1 } }]);
                setInputText(""); // clear text
              }}}
          >
            <Feather name="send" size={24} color="#ffffffff" />
          </TouchableOpacity>

        </View>

          </View>
        </View>
       
      ):
      (
        
          <View style={{ flexDirection: "row", flex:1}}>
          <TextInput
        style={{
        
          flex: 1,
          backgroundColor: "#222",
          color: "white",
          minWidth:'75%',
          borderRadius: 20,
          outline:"none",
          borderColor: 'transparent',
          paddingHorizontal: 12,
          paddingVertical: 8,
        }}
        onFocus={()=>{}}
        placeholder="Type a message!"
        placeholderTextColor="#888"
        
        value={inputText}
        onChangeText={ setInputText}
      />
       <View style={{ flexDirection: "row", alignItems: "center"}}>
        
          {/* Image */}
          <ImagePickerExample state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl ={setImageUrl}/>
          {/* Mic */}
               <SoundRec state={data} setData={setData} msgID={msgID} setMsgID= {setMsgID} setIsTyping={setIsTyping} setMessages= {setMessages} setImageUrl={setImageUrl} imageUrl={imageUrl}/>
          

          {/* Emoji */}
          

          {/* Send */}
          <TouchableOpacity
            style={{ marginLeft: 10, minWidth:'5%'}}
            onPress={() => { if (inputText.trim().length > 0) {
                onSend([{ text: inputText, createdAt: new Date(), _id: Date.now(), user: { _id: 1 } }]);
                setInputText(""); // clear text
              }}}
          >
            <Feather name="send" size={24} color="#ffffffff" />
          </TouchableOpacity>

        </View>
        </View>
       
        
      )
      }
      

      {/* ACTION BUTTONS (ALL ON RIGHT) */}
      
    </View>
  );
    }
  
};
  

  const renderActions = (props) => (
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    <TouchableOpacity onPress={() => console.log("Send Image")}>
      <Feather name="image" size={28} color="#ffffffff" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => console.log("Record Audio")}>
      <Feather name="mic" size={28} color="#ffffffff" />
    </TouchableOpacity>

    <TouchableOpacity onPress={() => console.log("Emoji Picker")}>
      <Feather name="smile" size={28} color="#ffffffff" />
    </TouchableOpacity>
  </View>
);

  useEffect(() => {
        console.log("Count updated:", msgID);
       
      }, [msgID]);
  
  useEffect(()=>{
    console.log(isTyping)
  }, [isTyping])   
  useEffect(()=>{
       setIsTyping(n=>n=false)
      //  data[2] true if audio
      if(data[0]!=undefined &&data[2]=="text"){
          Speech.speak(data[0],{voice:'Microsoft Zira - English (United States)'})
          setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: msgID,
            text: data[0],
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Esmeralda',
            
            },
          },
        ] )
        
        , )
      }
      
      else if(data[2] == "audio"){
        setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: msgID,
            audio:true,
          
            audioFile: data[0],
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Esmeralda',
            
            },
          },
        ] )
        
        , )
      }
      else if(data[2]=="image"){
         setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [
          {
            _id: msgID,
            image:true, 
            text:data[0],
            width: data[4],
            height: data[5],
            imageUri:data[3],
            audioFile:data[6],
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Esmeralda',
            
            },
          },
        ] )
        
        , )

      }
     
    
     }, [data]) 
  useEffect(() => {
   
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Esmeralda',
      
        },
      },
    ])
    
  }, [])
  // needs dependency track(use Callback hook since image aint local)
  const onSend = useCallback(async(messages = []) => {
     setMsgID(n=> n+1)
    //  this adds message twice if if wasnt present
     if(imageUrl.length==0){
         setMessages(previousMessages =>
                      GiftedChat.append(previousMessages, messages),
                        
                    )
     }
 
     setIsTyping(isTyping=>true)
     SendMessage(messages.at(messages.length-1).text, {setData,msgID,setMsgID, setIsTyping, imageUrl, setImageUrl})
    // const response = await fetch(" http://127.0.0.1:5000/getMessage", {
                
    //             mode:'cors',
    //             headers:
    //             {
    //                 "Content-Type": "application/json"
    //             },
    //             method: "POST",
    //             body: JSON.stringify({ instruction:messages.at(messages.length-1).text }),}).then((res)=> res.json()).then((json)=>{
    //                 setData(data=>data=[json.resp, msgID, 'text']);
                    
    //                 console.log(json.resp)
    //                 var tempArr =[]
                    
                    
                    
                 
                    
                       
                    
                               
                                  
                    
    //             })

    
  }, [imageUrl])

  return (
   
        <GiftedChat
      isTyping={isTyping}
      messages={messages}
      renderMessageAudio={audioMsg}
      renderMessageImage={imageMsg}
      renderInputToolbar={(toolbarProps) => (
        <ChatToolbar
          {...toolbarProps}
          
          key="customToolbar"
        />
      )}
      messagesContainerStyle={{width:"100%",height:"auto", flex:1 }}
    
      user={{
        _id: 1,
      }}
      colorScheme='dark'
      keyboardAvoidingViewProps={{ keyboardVerticalOffset }}
    />
 
  
  )
  
}
const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0553',
  },
  toolbarContainer: {
    backgroundColor: '#000000ff',
    borderTopWidth: 1,
   
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  primaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
  },
  actionIcon: {
    marginHorizontal: 5,
  },
  composer: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 12,
    fontSize: 16,
    marginHorizontal: 5,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
  },
});
export default ChatScreen;