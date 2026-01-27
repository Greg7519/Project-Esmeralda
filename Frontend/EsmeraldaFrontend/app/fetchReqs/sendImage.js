import axios from "axios";
import * as FileSystem from 'expo-file-system/legacy';
import { uploadAsync } from "expo-file-system/legacy";
import { Platform } from "react-native";
function sendImgMessage(imageUri,{ setData, msgID, setMsgID,setIsTyping, text="",voiceUri="", setImageUrl}){
    // imageUri is an array of uris [imageUri, width, height]
       var error = false
        let formData = new FormData()
        
          if(Platform.OS=="android" || Platform.OS=="ios"){
                   
                   formData.append('image', {
            uri: imageUri,
            name: 'image.jpeg',
            type: 'image/jpeg',
        });
                if(voiceUri.length>0){
                    var blobData = new Blob([voiceUri],{type: ["image/png", "image/jpeg", "image/gif"]})
                    formData.append("audio",blobData, "audio.webm")
                    var files = [imageUri[0], voiceUri]
                    setData(()=> [text, msgID,"image",imageUri[0], imageUri[1], imageUri[2], voiceUri])
                    FileSystem.readAsStringAsync(voiceUri,{encoding: FileSystem.EncodingType.Base64}).then((data)=>{
                       
                            uploadAsync(
                    `${process.env.EXPO_PUBLIC_API_URL}/getImageMessageWithAudio`,
                    imageUri[0], // MUST be a string file:// uri
                    {
                        fieldName: 'image',
                        httpMethod: 'POST',
                        
                        uploadType:  FileSystem.FileSystemUploadType.MULTIPART,
                        parameters:{ audioMob: data },
                        
                    }
                    ).catch((errorPar)=> {
                        error=true;
                        console.log("Error is", errorPar)
                        setMsgID(id=> id+1)
                    
                        
                        setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                            if(!error){
                            //    need to parse resp.body since uploadAsync returns a string body
                                console.log("Response is",JSON.parse(resp.body).resp)
                                setData(()=>[JSON.parse(resp.body).resp, msgID, 'text'])
                            
                                setMsgID(id=> id+1)
                                setImageUrl(img=>img=[])
                            }
                        
                            
                            }) 
                    })
 
                   
                    
            
            
               }
            else{
            formData.append('instrText', text)
            setData(()=> [text, msgID,"image",imageUri[0], imageUri[1], imageUri[2]])
             var instance = axios.create({timeout:7000})
             
            
            //  axios is unreliable for file uploads on mobile, using expo-file-system uploadAsync instead
                        uploadAsync(
            `${process.env.EXPO_PUBLIC_API_URL}/getImageMessageWithText`,
            imageUri[0], // MUST be a string file:// uri
            {
                fieldName: 'image',
                httpMethod: 'POST',
                uploadType:  FileSystem.FileSystemUploadType.MULTIPART,
                parameters:{ instrText: text },
                
            }
            ).catch((errorPar)=> {
                error=true;
                console.log("Error is", errorPar)
                 setMsgID(id=> id+1)
              
                
                 setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                    if(!error){
                    //    need to parse resp.body since uploadAsync returns a string body
                        console.log("Response is",JSON.parse(resp.body).resp)
                        setData(()=>[JSON.parse(resp.body).resp, msgID, 'text'])
                      
                        setMsgID(id=> id+1)
                        setImageUrl(img=>img=[])
                    }
                
                      
                    }) 
            
            
                }   


          }
          else{
             var req = axios.get(imageUri[0], {responseType:'blob'}).then((resp)=>{
            
          console.log(text)
        return resp.data;
    }).then((blob)=>{
         var blobData = new Blob([blob],{type: ["image/png", "image/jpeg", "image/gif"]})
         formData.append("image",blobData, "image.png")
        if(voiceUri.length>0){
           axios.get(voiceUri, {responseType:'blob'}).then((audio)=>{
                return audio.data
            }).then((audioData)=>{ var audioFile = new Blob([audioData],{type: ["audio/webm"]})
             formData.append("audio",audioFile, "audio.webm")
              
            setData(()=> [text, msgID,"image",imageUri[0], imageUri[1], imageUri[2], voiceUri])
             var instance = axios.create({timeout:30000})
             instance.post(`${process.env.EXPO_PUBLIC_API_URL}/getImageMessageWithAudio`,formData).catch((errorPar)=> {
                error=true;
                 setMsgID(id=> id+1)
                
                
                 setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                   
                        
                    if(!error){
                        console.log("Response is", resp.data)
                        setData(data=>data=[resp.data.resp, msgID, 'text']);
                        setMsgID((id)=> id+1)
                        setImageUrl(img=>img=[])
                     
                        
                    }       
                    
                
                      
            })
            
            
            
            }
            
            
            
            )
         
           
           
          
         
        }
        else{
            formData.append('instrText', text)
            setData(()=> [text, msgID,"image",imageUri[0], imageUri[1], imageUri[2]])
             var instance = axios.create({timeout:30000,formData, headers: {
            'Content-Type': 'multipart/form-data'
            }})
                  
              const response =  instance.post(`${process.env.EXPO_PUBLIC_API_URL}/getImageMessageWithText`,formData, {
            mode:'cors',
            method: "POST",
             headers: {
      'Content-Type': 'multipart/form-data'
    },
            body: formData
            }).catch((errorPar)=> {
                error=true;
                 setMsgID(id=> id+1)
              
                
                 setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                    if(!error){
                        setData(data=>data=[resp.data.resp, msgID, 'text']);
                        setMsgID((id)=> id+1)
                        setImageUrl(img=>img=[])
                             
                    }
                
                      
                    })
                }
            
                
                
            
            
            
            })
          }
         
    
   
    

}
export default sendImgMessage