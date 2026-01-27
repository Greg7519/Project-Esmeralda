import axios from 'axios'
import sendImgMessage from "./sendImage"
function sendMessage(text, {setData, msgID, setMsgID,setIsTyping, imageUrl, setImageUrl}){
    console.log(imageUrl)
    if(imageUrl.length>0){
       
        sendImgMessage(imageUrl,{setData,msgID,setMsgID,setIsTyping, text, setImageUrl})
    }
    else{
        
    var error = false
    // timeout because android is slower
    var instance = axios.create({timeout:4000, data:'json'})
    var instruction =text
    const response = instance.post(`${process.env.EXPO_PUBLIC_API_URL}/getMessage`, {
    mode:'cors',
    headers:
    {
        "Content-Type": "application/json"
    },
    method: "POST",
    body: { instruction:text }}).catch((errorPar)=> {
                error=true;
                setIsTyping(()=>false)
                setData(()=>['Couldnt connect to the server!Try again and check your internet connection!', msgID, 'text'])}).then((resp )=>{
                    if(!error){
                        console.log("Response is", resp.data)
                        setData(data=>data=[resp.data.resp, msgID, 'text']);
                        setMsgID((id)=> id+1)
                     
                        
                    }
                      
            })
    }
    console.log(text)
   

}
export default sendMessage