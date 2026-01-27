Esmeralda: Your personal Voice assistant
✅V1(Console level):
🎤Accepted audio input
🎤Voice Recognition
🤖Gemini integration
🌐 Flask integration

✅V2(Adding react native frontend+ expanding features)
📱Integrated expo+ react native for developing a chat frontend 
💬React native gifted chat used for that purpose
📁Expo used for file handling from android+web interfaces
🎶 Necesseary conversions were performed at backend to convert m4a and webm files to wav for voice recognition
🌐Python flask expanded to include 4 endpoints to handle input cross-platform, connection establishes using axios+Expo uploadFileAsync(to fix some mobile issues)
⚠️Added exceptions for network erros as well as voice recognition not working

🔨Features yet to be built
Adding a database to fetch/store data
Adding signup/login forms and functionality
Going from a general to a specific purpose voice assistant

📝Instructions
Clone this repository https://github.com/Greg7519/Project-Esmeralda.git
Install all flask+ Voice assistant packages using python version 3.12.1(found this particular version working for all packages)
Install react native + expo and then use npm install on the folder to install the necesseary project dependencies
In backend add your local gemini API key in .env file(same folder as main.py at python scripts folder) with the name API_KEY, as well as the domain of your frontend port/domain using ORIGIN name
In frontend add EXPO_PUBLIC_API_URL with where your backend is active from .


