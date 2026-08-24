import {
    initializeApp
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";


import {
    getAuth
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    getFirestore
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
    getStorage
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


const firebaseConfig = {

    apiKey: "AIzaSyACt56Oa6rxu62oHizYiE5JOacjpVL9mAo",

    authDomain:
        "fb-project-7e3ce.firebaseapp.com",

    projectId:
        "fb-project-7e3ce",

    storageBucket:
        "fb-project-7e3ce.firebasestorage.app",

    messagingSenderId:
        "645075129450",

    appId:
        "1:645075129450:web:22f51c1c3be18c57986613"

};

const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


const storage =
    getStorage(app);


export {
    app,
    auth,
    db,
    storage
};
