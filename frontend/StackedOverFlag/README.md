# StackedOverFlag

This is a game built with React Native. It is a trivia game where the user has to guess the correct country to a question.

nb. Sign in with Google doesn't work yet

# Setting up the game

### Prerequisites
1. Clone the repository
2. Install Node
3. Install Yarn
4. Install Expo Go on your phone -- optional
5. Add your Google Gemini API key to your local .env file so that the game can generate hints


### How to run the backend 

1. Run `cd backend/StackedOverFlag/` to navigate into the backend folder
2. Run `npm install` to install all required packages


### How to run the game frontend on your phone - easiest method

3. Run `cd frontend/StackedOverFlag/` to navigate to the frontend project folder
4. Run `yarn` to install the dependencies
    - You may have to run `npm install ts-node typescript @types/node --save-dev` if you encounter errors related to `ts-node/register`
5. Run `npx expo start` to start the development server
6. Respond yes to any package installation prompts
7. Scan the QR code with the Expo Go app on your phone or tablet
8. For this to work, you need to be on the same network as your backend. I used [wihotspot](https://github.com/lakinduakash/linux-wifi-hotspot) to set up an access point on my Ubuntu box and gave the gateway an ip of 10.10.10.1. You are free to do the same. 

### Alternative - web

8. Instead of using expo go, you can use your web browser. You only need to change the baseUrl in [QuestionScreen.tsx](./app/screens/QuestionScreen.tsx) on line 42 to `http://localhost:3000/api` and change the listening ip address in [server.js](./backend/StackedOverFlag/server.js) on line 167 to localhost by removing the 0.0.0.0.
9. After this you should re-run the backend server with `node server.js`, run `npx expo start` in a different terminal window, and press the `w` key in the terminal to run the game in the web browser.
10. In the automatically opened browser window, switch to dev mode by clicking the `Toggle Developer Menu` button and switching to a mobile device view.
11. You can now play the game in the browser.


## Starting the services
https://github.com/user-attachments/assets/23818ac0-0f73-45b9-8a61-627d98e60d57

## Gameplay on Android
https://github.com/user-attachments/assets/3d0f23e8-038e-41bf-9410-c7fbc88f7ef4

## Gameplay on iOS

https://github.com/user-attachments/assets/99405abf-e932-43e4-8f93-51d39f5d9726


#### nb. I used the Ignite template to build this project to save time. The old README.md is in [ReadMe.old.md](./ReadMe.old.md)

## What's on the horizon
- leaderboard
- offline mode
- authentication
- difficulty levels
- different categories
- (maybe) monetization :-)

--- 
