# Overdose Prevention

Every Wednesday.
A map application to help users find the nearest overdose prevention centre.

## Pre-req
- NPM & NodeJs @ latest version (https://nodejs.org/en/)
- Run `npm install -g expo-cli`
- Install the Expo mobile app on your device

## Tech Stack
- React-Native - Render interface.

## Serving App on device
1. Clone repo
2. Run `npm install`
3. Install `pre-commit`\

   Mac Users -->\
   Install homebrew and run `brew install pre-commit`\
   Run `pre-commit install`\

   Windows Users -->\
   Install the latest Python (3.7) executable file from <https://www.python.org/downloads/>\
   Install pip `curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py`\
   Run `python get-pip.py`\
   Run `pip install pre-commit`\
   Run `pre-commit install`
4. Login to Expo by running `expo login` and follow the instructions to enter username and password
5. Run `npm start`
6. Assuming you have logged in to Expo on your Expo mobile app, go to the "projects" tab. You should see your app serving from your computer

## Troubleshoot
1. Expo app says the app is taking longer than expected to load
    1. Open up computer terminal and run: `ipconfig` for Windows. `ifconfig` for Mac
    2. Check to see if your IP is the same as the one Expo used (Expo shows the IP after you ran `npm start`)
    3. If not, try to follow this [link](https://answers.microsoft.com/en-us/windows/forum/windows_10-networking/adapter-priority-setting-unavailable-in-windows-10/d2b63caa-e77c-4b46-88b5-eeeaee00c306?auth=1) for Windows

## License
This project is licensed under the MIT License.
