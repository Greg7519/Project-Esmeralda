import pythonscripts.main as va
from flask import *
app = Flask(__name__)
VoiceassistantClass = va.VoiceAssistant
VoiceAssistant = VoiceassistantClass()
@app.route('/')
def welcome():
  return VoiceAssistant.greeting
app.run()