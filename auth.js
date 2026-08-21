import {
    auth,
    db
} from "./firebase.js";


import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    setDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";



/* ======================================
   SIGN UP
====================================== */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "signupName"
                ).value.trim();


            const email =
                document.getElementById(
                    "signupEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "signupPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "signupConfirmPassword"
                ).value;


            const message =
                document.getElementById(
                    "signupMessage"
                );


            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                message.style.color = "red";

                return;

            }


            try {

                message.textContent =
                    "Creating account...";

                message.style.color =
                    "#1877f2";


                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                await updateProfile(
                    user,
                    {
                        displayName: name
                    }
                );


                await setDoc(
                    doc(db, "users", user.uid),
                    {
                        uid: user.uid,
                        name: name,
                        email: email,
                        photoURL: "",
                        bio: "",
                        createdAt:
                            serverTimestamp()
                    }
                );


                message.textContent =
                    "Account created successfully!";

                message.style.color =
                    "green";


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 1000);


            } catch (error) {

                console.error(error);


                message.textContent =
                    getFirebaseError(
                        error.code
                    );

                message.style.color =
                    "red";

            }

        }
    );

}



/* ======================================
   LOGIN
====================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            try {

                message.textContent =
                    "Logging in...";

                message.style.color =
                    "#1877f2";


                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                message.textContent =
                    "Login successful!";

                message.style.color =
                    "green";


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 700);


            } catch (error) {

                console.error(error);


                message.textContent =
                    getFirebaseError(
                        error.code
                    );

                message.style.color =
                    "red";

            }

        }
    );

}



/* ======================================
   FIREBASE ERROR MESSAGE
====================================== */

function getFirebaseError(code) {

    switch (code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email.";

        case "auth/weak-password":
            return "Password should be at least 6 characters.";

        case "auth/invalid-credential":
            return "Incorrect email or password.";

        case "auth/user-not-found":
            return "Account not found.";

        case "auth/wrong-password":
            return "Incorrect password.";

        default:
            return "Something went wrong. Please try again.";

    }

}
