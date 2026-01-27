import pythonscripts.main as va
import os
import werkzeug
import base64
from pydub import AudioSegment
import dotenv
dotenv.load_dotenv()
from flask import *

from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 
# app.config['DEBUG'] = True
cors = CORS(app)
VoiceassistantClass = va.VoiceAssistant
VoiceAssistant = VoiceassistantClass()
@app.route('/')
@cross_origin(app,  resources={r"/*": {"origins": os.getenv("ORIGIN")}})
def welcome():
  return VoiceAssistant.greeting
@app.route('/getImageMessageWithText', methods=['POST'])
@cross_origin()
def getImageMessageWithText(): 
   
      data = request.get_data()
      form = request.form
      print(request.files, 'form: ' ,form)
      print('data: ', data)
   
      img = request.files['image']
      img.save('img.png')
      text = request.form['instrText']
      resp = VoiceAssistant.processImage('img.png', text)
    
      respDict ={ 'resp':resp}
      return respDict
@app.route('/getImageMessageWithAudio', methods=['POST'])
@cross_origin()
def getImageMessageWithAudio(): 
   
     
      print('files: ', request.files)
      try:
            file_content = request.form['audioMob']
            img = request.files['image']
      # its not in data, its in FORM because its a form-data request
            audio_bytes = base64.b64decode(file_content)
      
            
            with open('audio.m4a', 'wb') as audio_data:
                  #form from android, because i am sending files
                  audio_data.write(audio_bytes)
                  sound = AudioSegment.from_file('audio.m4a', format='m4a')
                  file_handle = sound.export('output.wav', format='wav')
                  file_handle.close()
      except werkzeug.exceptions.BadRequest as e:
            print(e)
            img = request.files['image']
            audio = request.files['audio']   
            audio.save('audio.webm')
            VoiceAssistant.webmToWav("audio.webm")
            audio.close()
           
      img.save('img.png')
   
      
     
      voice =VoiceAssistant.recognizeVoice("output.wav")
      if(voice!='error'):
      # note image not being recognized, can be due to voice not being recognized properly
            resp =VoiceAssistant.processImage('img.png', voice)
      else:
            resp = 'Couldnt hear you!Try again'
     
      img.close()
      
      respDict ={ 'resp':resp}
      
      return respDict
@app.route('/getVoiceMessage', methods=['POST'])
@cross_origin()
def getVoiceMessage(): 
   
      data = request.get_data()
      print(data)
    
      try:
            
            if(request.files):
                  #form from android, because i am sending files
                  request.files['audio'].save(request.files['audio'].filename)
                  sound = AudioSegment.from_file('voice.m4a', format='m4a')
                  file_handle = sound.export('output.wav', format='wav')
                  file_handle.close()
            else:
                  # blob from web
                  VoiceAssistant.blobToFile(data)
                  VoiceAssistant.webmToWav("audio.webm")
            resp =VoiceAssistant.geminiAIInstr(VoiceAssistant.recognizeVoice("output.wav"),False)
            print(resp)
            respDict ={ 'resp':resp}
      except Exception as e:
            print(e)
            respDict = {'resp': 'Couldnt hear you!Try again', 'error':'true'}
      return respDict
@app.route('/getMessage', methods=['POST'])
@cross_origin()
def getMessage(): 
   
      data = request.get_json()
      print()
      
      try:
            myDic = {'resp': VoiceAssistant.geminiAIInstr(data['body']['instruction'], False)}
      
      except Exception as e:
            print(e)
            myDic = {'resp': 'Ai unavailable!Try again later!', 'error':'true'}
          
      
    
      return jsonify(myDic)
app.run()