from PIL import Image
import pyttsx3
import datetime
import speech_recognition as sr
import base64
from google import generativeai as genai
import moviepy.editor
import os
import dotenv
dotenv.load_dotenv()
#add pyttsx3 version 2.91
class VoiceAssistant():
    def __init__(self, text=""):
        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty('voice', 'com.apple.speech.synthesis.voice.samantha')
            self.client = genai.configure(api_key=os.getenv("API_KEY"))
            self.greeting = "Hello I am Esmeralda!How can i be of help to you?"
            pyttsx3.speak(self.greeting)
            
            
          
           
        except:
            print("An error occured!")
    # def recordAudio(self, duration=5, samplerate=48000):
    #     print(f"Recording for {duration} seconds")
    #     audio_data = sd.rec(int(samplerate*duration), samplerate=samplerate, channels=2,dtype='int16')
    #     sd.wait()
    #     wavfile.write("recording.wav", samplerate, audio_data)
    #     print(f"Recording saved!")
    def webmToWav(self, filePath):
          clip= moviepy.editor.AudioFileClip(filePath)
          clip.write_audiofile("output.wav")
    def blobToFileImg(self,byteArr):
       img_file= open("img.png", "wb")
       img_file.write(byteArr)
       return "img.png"
    def processImage(self, imgPath, instrText,testing=False):
        if(testing):
            return 'testing'
        img= Image.open(imgPath)
        print("Image:'",img)
        model = genai.GenerativeModel("gemini-2.5-flash-lite")
        response = model.generate_content(
                
                contents=[
                img,
                instrText
                ]
            )

        print(response.text)
        return response.text

    def blobToFile(self,byteArr):
       audio_file= open("audio.webm", "wb")

       audio_file.write(byteArr)
       self.webmToWav("audio.webm")
    
    def recognizeVoice(self, fileLoc):
       r = sr.Recognizer()
       
       file = sr.AudioFile(fileLoc)
     
       with file as source:
        r.adjust_for_ambient_noise(source)
        audio = r.record(source)
      
        print('audio is: ',audio)
        try:
            # 1. Get the raw response from Google
            response = r.recognize_google(audio, show_all=True, language="en-US")
            
            # 2. Extract the best transcript from the 'alternative' list
            if response and 'alternative' in response:
                # The first item in 'alternative' is usually the most confident
                best_guess = response['alternative'][0]['transcript']
                print(f"Recognized Text: {best_guess}")
                
                # 3. Use the STRING, not the DICT, for your return or next step
                # (Assuming you want to pass this to a Generative AI or logic)
                return best_guess 
            else:
                return "No speech detected"

        except Exception as e:
            print(f"Error: {e}")
            return 'error'
        # Reading Microphone as source
        # listening the speech and store in audio_text variable
     
            
      


    def tellTime(self):
            time = datetime.datetime.now()
            timeMins = int(time.strftime("%M"))
            timeSecs = int(time.strftime("%S"))
            timeHrinit =  int(time.strftime("%H"))
            timeHr = int(time.strftime("%H")) %12
            timeHuman=""
            if(timeHrinit>12):
                timeHuman = str(timeHr) + "PM"
            else:
                timeHuman = str(timeHr) +"AM"
            timeMins= str(timeMins)
            timeSecs = str(timeSecs)
            pyttsx3.speak("The time is  " + timeHuman + timeMins + "minutes"+ timeSecs + "seconds" )
    def geminiAIInstr(self,instr, isTesting):
        if(isTesting):
            return "Testing returned!"

        
        model = genai.GenerativeModel("gemini-2.5-flash-lite")
        
        response = model.generate_content(instr)
        # pyttsx3.speak(response.text)
        # self.engine.runAndWait()
        return response.text
           
            
    


# instruction =""
# VoiceAssistant1.engine.say("Enter an instruction, exit to exit:")
# instruction = input('Enter instruction')
# try:
#     text = VoiceAssistant1.geminiAIInstr(instruction)
#     print(text)
# except:
#     VoiceAssistant1.engine.say("AI unavailable!Please try again later!")
        
        
