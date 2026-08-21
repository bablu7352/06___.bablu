/* =========================================
   SOCIALHUB - FIREBASE FEED
   PART 5
========================================= */

import {
    auth,
    db
} from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
    serverTimestamp,
    query,
    orderBy
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


let currentUser = null;


/* =========================================
   AUTH CHECK
========================================= */

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    currentUser = user;

    await loadUserInfo();

    await loadPosts();

    setupLogout();

});


/* =========================================
   LOAD USER
========================================= */

async function loadUserInfo() {

    const userRef =
        doc(db, "users", currentUser.uid);

    const userSnap =
        await getDoc(userRef);


    let name =
        currentUser.displayName || "User";


    if (userSnap.exists()) {

        const data =
            userSnap.data();

        name =
            data.name || name;

    }


    /* NAV PROFILE */

    const navName =
        document.querySelector(
            ".nav-profile span"
        );

    if (navName) {
        navName.textContent = name;
    }


    /* SIDEBAR */

    const sidebarName =
        document.querySelector(
            ".sidebar-profile h3"
        );

    if (sidebarName) {
        sidebarName.textContent = name;
    }


    /* CREATE POST */

    const postInput =
        document.querySelector(".post-input");

    if (postInput) {

        postInput.textContent =
            `What's on your mind, ${name}?`;

    }

}


/* =========================================
   LOGOUT
========================================= */

function setupLogout() {

    const profile =
        document.querySelector(".nav-profile");


    if (!profile) return;


    profile.addEventListener(
        "click",
        async () => {

            const confirmLogout =
                confirm(
                    "Do you want to logout?"
                );


            if (!confirmLogout) return;


            try {

                await signOut(auth);

                window.location.href =
                    "login.html";

            } catch (error) {

                console.error(error);

            }

        }
    );

}


/* =========================================
   LOAD POSTS
========================================= */

async function loadPosts() {

    const feed =
        document.querySelector(".feed");


    if (!feed) return;


    const oldPosts =
        feed.querySelectorAll(
            ".firebase-post"
        );


    oldPosts.forEach(post => {
        post.remove();
    });


    try {

        const postsQuery =
            query(
                collection(db, "posts"),
                orderBy(
                    "createdAt",
                    "desc"
                )
            );


        const snapshot =
            await getDocs(postsQuery);


        snapshot.forEach(postDoc => {

            const post =
                postDoc.data();


            createPostElement(
                post,
                postDoc.id
            );

        });


    } catch (error) {

        console.error(
            "Post loading error:",
            error
        );

    }

}


/* =========================================
   CREATE POST IN FIRESTORE
========================================= */

async function savePost(text) {

    if (!currentUser) return;


    const postInput =
        document.querySelector(
            ".post-input"
        );


    const name =
        currentUser.displayName ||
        "User";


    try {

        await addDoc(
            collection(db, "posts"),
            {

                uid:
                    currentUser.uid,

                name:
                    name,

                text:
                    text,

                likes:
                    [],

                comments:
                    [],

                createdAt:
                    serverTimestamp()

            }
        );


        await loadPosts();


    } catch (error) {

        console.error(error);

        alert(
            "Post save nahi ho saka."
        );

    }

}


/* =========================================
   CREATE POST ELEMENT
========================================= */

function createPostElement(
    post,
    postId
) {

    const feed =
        document.querySelector(
            ".feed"
        );


    const firstPost =
        feed.querySelector(
            ".post-card"
        );


    const article =
        document.createElement(
            "article"
        );


    article.className =
        "post-card firebase-post";


    const likes =
        post.likes || [];


    const comments =
        post.comments || [];


    const liked =
        likes.includes(
            currentUser.uid
        );


    article.innerHTML = `

        <div class="post-header">

            <div class="post-user">

                <img
                    src="images/profile.jpg"
                    alt="User"
                >

                <div>

                    <h3>
                        ${escapeHTML(
                            post.name || "User"
                        )}
                    </h3>

                    <p>
                        Just now ·
                        <i class="fa-solid
                        fa-earth-americas"></i>
                    </p>

                </div>

            </div>


            <button class="more-btn">

                <i class="fa-solid
                fa-ellipsis"></i>

            </button>

        </div>


        <div class="post-content">

            <p>
                ${escapeHTML(
                    post.text || ""
                )}
            </p>

        </div>


        <div class="post-stats">

            <span class="like-count">

                <i class="fa-solid
                fa-thumbs-up"></i>

                ${likes.length}

            </span>


            <span>

                ${comments.length}
                Comments

            </span>

        </div>


        <div class="post-actions">

            <button
                class="like-btn
                ${liked ? "liked" : ""}"
            >

                <i class="${
                    liked
                    ? "fa-solid"
                    : "fa-regular"
                } fa-thumbs-up"></i>

                Like

            </button>


            <button class="comment-btn">

                <i class="fa-regular
                fa-comment"></i>

                Comment

            </button>


            <button class="share-btn">

                <i class="fa-solid
                fa-share"></i>

                Share

            </button>

        </div>


        <div class="comments-list">

            ${comments.map(
                comment => `

                <div class="new-comment">

                    <img
                        src="images/profile.jpg"
                        alt="User"
                    >

                    <div class="comment-content">

                        <strong>
                            ${escapeHTML(
                                comment.name
                            )}
                        </strong>

                        <p>
                            ${escapeHTML(
                                comment.text
                            )}
                        </p>

                    </div>

                </div>

            `
            ).join("")}

        </div>


        <div class="comment-box">

            <img
                src="images/profile.jpg"
                alt="Profile"
            >

            <input
                type="text"
                placeholder="Write a comment..."
            >

            <button>

                <i class="fa-solid
                fa-paper-plane"></i>

            </button>

        </div>

    `;


    if (firstPost) {

        feed.insertBefore(
            article,
            firstPost
        );

    } else {

        feed.appendChild(article);

    }


    setupPostEvents(
        article,
        postId,
        post
    );

}


/* =========================================
   POST EVENTS
========================================= */

function setupPostEvents(
    article,
    postId,
    post
) {


    /* LIKE */

    const likeButton =
        article.querySelector(
            ".like-btn"
        );


    likeButton.addEventListener(
        "click",
        async () => {

            const postRef =
                doc(
                    db,
                    "posts",
                    postId
                );


            const likes =
                post.likes || [];


            if (
                likes.includes(
                    currentUser.uid
                )
            ) {

                await updateDoc(
                    postRef,
                    {
                        likes:
                            arrayRemove(
                                currentUser.uid
                            )
                    }
                );

            } else {

                await updateDoc(
                    postRef,
                    {
                        likes:
                            arrayUnion(
                                currentUser.uid
                            )
                    }
                );

            }


            await loadPosts();

        }
    );


    /* COMMENT */

    const commentBox =
        article.querySelector(
            ".comment-box"
        );


    const input =
        commentBox.querySelector(
            "input"
        );


    const sendButton =
        commentBox.querySelector(
            "button"
        );


    async function addComment() {

        const text =
            input.value.trim();


        if (!text) return;


        const postRef =
            doc(
                db,
                "posts",
                postId
            );


        const comment = {

            uid:
                currentUser.uid,

            name:
                currentUser.displayName ||
                "User",

            text:
                text

        };


        try {

            await updateDoc(
                postRef,
                {
                    comments:
                        arrayUnion(
                            comment
                        )
                }
            );


            input.value = "";

            await loadPosts();


        } catch (error) {

            console.error(error);

        }

    }


    sendButton.addEventListener(
        "click",
        addComment
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                addComment();

            }

        }
    );


    /* SHARE */

    const shareButton =
        article.querySelector(
            ".share-btn"
        );


    shareButton.addEventListener(
        "click",
        async () => {

            const data = {

                title:
                    "SocialHub",

                text:
                    "Check out this post!"

            };


            if (
                navigator.share
            ) {

                try {

                    await navigator.share(
                        data
                    );

                } catch (error) {

                    console.log(
                        "Share cancelled"
                    );

                }

            } else {

                alert(
                    "Share feature is not supported."
                );

            }

        }
    );

}


/* =========================================
   CREATE POST MODAL
========================================= */

const postInput =
    document.querySelector(
        ".post-input"
    );


if (postInput) {

    postInput.addEventListener(
        "click",
        () => {

            openCreatePost();

        }
    );

}


function openCreatePost() {

    const text =
        prompt(
            "What's on your mind?"
        );


    if (!text) return;


    savePost(text.trim());

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

           }
