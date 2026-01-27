import Entypo from '@expo/vector-icons/Entypo';
import Feather from '@expo/vector-icons/Feather';
import {
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorder,
  useAudioRecorderState,
} from 'expo-audio';
import { useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import sendVoiceMessage from '../fetchReqs/sendVoice';

export default function SoundRec({state, setData, msgID, setMsgID, setIsTyping, setMessages, imageUrl, setImageUrl}) {
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
 
  const record = async () => {
    audioRecorder.prepareToRecordAsync().then(()=>{
       audioRecorder.record();
    });
  
   
  };

  const stopRecording = async () => {
    // The recording will be available on `audioRecorder.uri`.
     await audioRecorder.stop()
     setIsTyping(true)
      if(imageUrl.length==0){
         const audioUri = audioRecorder.uri.replace('file:///', "")
         if(Platform.OS=='web'){
              setData((setState) => [audioRecorder.uri, msgID, 'audio'])
      setMsgID((id)=> id+1)
         }
         else{
          setData((setState) => [audioUri, msgID, 'audio'])
      setMsgID((id)=> id+1)
         }
         
     

      }
    //  stop destroys uri immediately in android, not on web due to garbage collection
   
     
     
            console.log( sendVoiceMessage(audioRecorder.uri,{state,setData, msgID, setMsgID, setIsTyping, setMessages,imageUrl, setImageUrl}))
           
         
        };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        console.log('Permission to access microphone was denied');
      }
      else{
        console.log('Granted!');
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();
  }, []);

  return (
    
    <View>
      {!recorderState.isRecording ?
       <TouchableOpacity 
          onPress={recorderState.isRecording ? stopRecording : record}
          style={{ marginLeft: 10 }}>
          
          <Feather name="mic" size={26} color="#ffffffff" />
        </TouchableOpacity>
        
      :
      <TouchableOpacity 
          onPress={recorderState.isRecording ? stopRecording : record}
          style={{ marginLeft: 10 }}>
          
          <Entypo name="controller-record" size={24} color="red" />
        </TouchableOpacity>}

      

      
      
    </View>
  );
}

const styles = StyleSheet.create({
  
});
