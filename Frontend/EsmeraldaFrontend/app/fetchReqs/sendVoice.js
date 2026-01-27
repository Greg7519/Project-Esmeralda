import axios from "axios";
import { Platform } from "react-native";
import sendImgMessage from "./sendImage";
function sendVoiceMessage(audioUri,{state, setData, msgID, setMsgID,setIsTyping, setMessages,imageUrl, setImageUrl}){
    var error = false;
    console.log("audio uri is: ",audioUri)
    if(Platform.OS=="android" || Platform.OS=="ios"){
        var formData = new FormData();
        formData.append('audio', {
            uri: audioUri,
            name: 'voice.m4a',
            type: 'audio/m4a',
        });
        var emptyText=""
        console.log(audioUri)
     
        if(imageUrl.length>0){
            var voiceUri = audioUri
            setMsgID(id=> id+1)
            sendImgMessage(imageUrl,{setData,msgID,setMsgID,setIsTyping, emptyText, voiceUri, setImageUrl})
        }
        else{
            var instance = axios.create({timeout:40000})
            const response = instance.post(`${process.env.EXPO_PUBLIC_API_URL}/getVoiceMessage`,formData,{headers: {
      'Content-Type': 'multipart/form-data',
    }}).catch((errorPar)=> {
                error=true;
                 setMsgID(id=> id+1)
                 
                setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                     setMsgID(id=> id+1)
                     
                    if(!error){
                        setData([resp.data.resp, msgID, 'text'])
                        setMsgID(id=> id+1)
                         
                    }
                         
            })
        }
    }
    else{
          var req = axios.get(audioUri, {responseType:'blob'}).then((resp)=>{
       
        return resp.data;
    }).then((blob)=>{
        
        var blobData= new Blob([blob],{type:'audio/webm'})
        var emptyText=""
     
        if(imageUrl.length>0){
            var voiceUri = audioUri
            setMsgID(id=> id+1)
            sendImgMessage(imageUrl,{setData,msgID,setMsgID,setIsTyping, emptyText, voiceUri, setImageUrl})
        }
        else{
            var instance = axios.create({timeout:30000})
            const response = instance.post(`${process.env.EXPO_PUBLIC_API_URL}/getVoiceMessage`,blobData,{
            mode:'cors',
            method: "POST",
            body: blobData
            }).catch((errorPar)=> {
                error=true;
                 setMsgID(id=> id+1)
                 
                setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                     setMsgID(id=> id+1)
                     
                    if(!error){
                        setData([resp.data.resp, msgID, 'text'])
                        setMsgID(id=> id+1)
                         
                    }
                         
            })
        }
    })    
    }
  
      
    
    

}
export default sendVoiceMessage

