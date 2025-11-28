
import pyttsx3
import datetime
import speech_recognition as sr
import sounddevice as sd
from google import generativeai as genai
from scipy.io import wavfile
import os
import dotenv
dotenv.load_dotenv()
#add pyttsx3 version 2.91
class VoiceAssistant():
    def __init__(self, text=""):
        try:
            self.engine = pyttsx3.init()
            self.engine.setProperty('voice', 'com.apple.speech.synthesis.voice.samantha')
            self.client = genai.configure(api_key=os.getenv("AI_KEY"))
            self.greeting = "Hello I am Esmeralda!How can i be of help to you?"
            pyttsx3.speak(self.greeting)
            
            
          
           
        except:
            print("An error occured!")
    def recordAudio(self, duration=5, samplerate=48000):
        print(f"Recording for {duration} seconds")
        audio_data = sd.rec(int(samplerate*duration), samplerate=samplerate, channels=2,dtype='int16')
        sd.wait()
        wavfile.write("recording.wav", samplerate, audio_data)
        print(f"Recording saved!")
    def recognizeVoice(self):
       r = sr.Recognizer()

        # Reading Microphone as source
        # listening the speech and store in audio_text variable
       with sr.Microphone() as source:
            print("Talk")
            audio_text = r.listen(source, 10)
            
            try:
                # using google speech recognition
                print("Text: "+r.recognize_google(audio_text))
               
                return r.recognize_google(audio_text)
            except:
                print("Sorry, I did not get that")


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
    def geminiAIInstr(self,instr):
        
        model = genai.GenerativeModel("gemini-2.0-flash")
        response = model.generate_content(instr)
        pyttsx3.speak(response.text)
        self.engine.runAndWait()
        return response.text
           
            
    

VoiceAssistant1 = VoiceAssistant("Hello")

# instruction =""
# VoiceAssistant1.engine.say("Enter an instruction, exit to exit:")
# instruction = VoiceAssistant1.recognizeVoice()
# try:
#     text = VoiceAssistant1.geminiAIInstr(instruction)
#     print(text)
# except:
#     VoiceAssistant1.engine.say("AI unavailable!Please try again later!")
        
        
