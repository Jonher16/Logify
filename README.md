# Logify

Table-type log creating and visualizing app. It allows to create log table templates, which then can be used to create logs. Logs can also be visualized, and they can be downloaded as excel files. All logs are stored in an online firebase database.

## Installation

First of all, create a ```firebase.js``` file in the /src folder and add this piece of code to it:

```
import firebase from "firebase"

const firebaseConfig = {
    "ADD YOUR FIREBASE CONFIG HERE"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebaseApp.firestore();

  export {auth, provider, db}
```
Create a firebase database with your Google account and copy and paste the firebase config into the code above. This will make the app be linked to it.
For information on how to create a firebase database, visit https://firebase.google.com/docs/

After doing this, just enter, install dependencies and run the app by executing:
```
npm install
npm start
```


