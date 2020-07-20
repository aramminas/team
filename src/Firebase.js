import app from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBmkqnNPa1D9_pRs_-xgoh3wcF12cYUZo0",
    authDomain: "teambuilder-8f5fc.firebaseapp.com",
    databaseURL: "https://teambuilder-8f5fc.firebaseio.com",
    projectId: "teambuilder-8f5fc",
    storageBucket: "teambuilder-8f5fc.appspot.com",
    messagingSenderId: "920023409389",
    appId: "1:920023409389:web:f4c39cf7d99251b624a2e4"
}

class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.storage = app.storage()
    }
}

let FB = new Firebase()
export default FB