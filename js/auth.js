// ==========================================
// CONNECTU AUTHENTICATION
// ==========================================

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";


import {
    doc,
    setDoc,
    serverTimestamp
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


import {
    auth,
    db
} from "./firebase-config.js";



// ==========================================
// SIGNUP
// ==========================================

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    signupForm.addEventListener(
        "submit",
        async (event) => {

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


            // Password check

            if (password !== confirmPassword) {

                message.textContent =
                    "Passwords do not match.";

                return;
            }


            try {

                message.textContent =
                    "Creating your account...";


                // Create Firebase account

                const userCredential =
                    await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );


                const user =
                    userCredential.user;


                // Update Firebase profile

                await updateProfile(
                    user,
                    {
                        displayName: name
                    }
                );


                // Create user document

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


                // Go to home

                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 1000);


            } catch (error) {

                console.error(error);

                message.textContent =
                    getAuthError(error.code);

            }

        }
    );

}



// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

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


                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                message.textContent =
                    "Login successful!";


                setTimeout(() => {

                    window.location.href =
                        "index.html";

                }, 700);


            } catch (error) {

                console.error(error);

                message.textContent =
                    getAuthError(error.code);

            }

        }
    );

}



// ==========================================
// LOGOUT FUNCTION
// ==========================================

export async function logoutUser() {

    try {

        await signOut(auth);

        window.location.href =
            "login.html";

    } catch (error) {

        console.error(
            "Logout error:",
            error
        );

    }

}



// ==========================================
// AUTH STATE
// ==========================================

export function watchAuthState(
    callback
) {

    return onAuthStateChanged(
        auth,
        callback
    );

}



// ==========================================
// FIREBASE ERROR MESSAGES
// ==========================================

function getAuthError(code) {

    switch (code) {

        case "auth/email-already-in-use":
            return "This email is already registered.";

        case "auth/invalid-email":
            return "Please enter a valid email.";

        case "auth/weak-password":
            return "Password must be at least 6 characters.";

        case "auth/invalid-credential":
            return "Email or password is incorrect.";

        case "auth/user-not-found":
            return "No account found with this email.";

        case "auth/wrong-password":
            return "Incorrect password.";

        case "auth/too-many-requests":
            return "Too many attempts. Please try again later.";

        default:
            return "Something went wrong. Please try again.";

    }

}
