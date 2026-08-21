/* =========================================
   SOCIALHUB
   PART 6
   IMAGE UPLOAD + PROFILE PHOTO
========================================= */

import {
    auth,
    db,
    storage
} from "./firebase.js";


import {
    onAuthStateChanged,
    signOut,
    updateProfile
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


import {
    ref,
    uploadBytes,
    getDownloadURL
} from
"https://www.gstatic.com/firebasejs/12.1.0/firebase-storage.js";


let currentUser = null;


/* =========================================
   AUTH CHECK
========================================= */

onAuthStateChanged(auth, async user => {

    if (!user) {

        window.location.href =
            "login.html";

        return;

    }

    currentUser = user;

    await loadUserInfo();

    await loadPosts();

    setupLogout();

    setupCreatePost();

    setupProfilePhoto();

});


/* =========================================
   LOAD USER INFO
========================================= */

async function loadUserInfo() {

    const userRef =
        doc(
            db,
            "users",
            currentUser.uid
        );


    const userSnap =
        await getDoc(userRef);


    let name =
        currentUser.displayName ||
        "User";


    let photo =
        currentUser.photoURL ||
        "images/profile.jpg";


    if (userSnap.exists()) {

        const data =
            userSnap.data();


        name =
            data.name || name;


        photo =
            data.photoURL || photo;

    }


    /* NAV */

    const navName =
        document.querySelector(
            ".nav-profile span"
        );


    if (navName) {

        navName.textContent =
            name;

    }


    const navImage =
        document.querySelector(
            ".nav-profile img"
        );


    if (navImage) {

        navImage.src =
            photo;

    }


    /* SIDEBAR */

    const sideName =
        document.querySelector(
            ".sidebar-profile h3"
        );


    if (sideName) {

        sideName.textContent =
            name;

    }


    const sideImage =
        document.querySelector(
            ".sidebar-profile img"
        );


    if (sideImage) {

        sideImage.src =
            photo;

    }


    /* CREATE POST */

    const postInput =
        document.querySelector(
            ".post-input"
        );


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
        document.querySelector(
            ".nav-profile"
        );


    if (!profile) return;


    profile.addEventListener(
        "click",
        async () => {

            const ok =
                confirm(
                    "Do you want to logout?"
                );


            if (!ok) return;


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
        document.querySelector(
            ".feed"
        );


    if (!feed) return;


    feed.querySelectorAll(
        ".firebase-post"
    ).forEach(post => {

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
            await getDocs(
                postsQuery
            );


        snapshot.forEach(postDoc => {

            createPostElement(
                postDoc.data(),
                postDoc.id
            );

        });


    } catch (error) {

        console.error(
            "Posts error:",
            error
        );

    }

}


/* =========================================
   CREATE POST
========================================= */

function setupCreatePost() {

    const postInput =
        document.querySelector(
            ".post-input"
        );


    if (!postInput) return;


    postInput.addEventListener(
        "click",
        openCreatePost
    );

}


function openCreatePost() {

    const modal =
        document.createElement(
            "div"
        );


    modal.className =
        "upload-modal";


    modal.innerHTML = `

        <div class="upload-box">

            <div class="upload-header">

                <h2>Create Post</h2>

                <button
                    id="closeUpload"
                    class="close-upload"
                >
                    ×
                </button>

            </div>


            <textarea
                id="postText"
                placeholder="What's on your mind?"
            ></textarea>


            <div
                id="postPreview"
                class="post-preview"
            ></div>


            <label
                for="postFile"
                class="image-select"
            >

                <i class="fa-solid fa-image"></i>

                Add Photo

            </label>


            <input
                type="file"
                id="postFile"
                accept="image/*"
                hidden
            >


            <button
                id="publishPost"
                class="publish-btn"
            >

                Post

            </button>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    addUploadStyles();


    /* CLOSE */

    document
        .getElementById(
            "closeUpload"
        )
        .onclick = () => {

            modal.remove();

        };


    /* IMAGE PREVIEW */

    const fileInput =
        document.getElementById(
            "postFile"
        );


    const preview =
        document.getElementById(
            "postPreview"
        );


    let selectedFile = null;


    fileInput.addEventListener(
        "change",
        event => {

            selectedFile =
                event.target.files[0];


            if (!selectedFile) return;


            if (
                !selectedFile.type
                    .startsWith("image/")
            ) {

                alert(
                    "Please select an image."
                );

                return;

            }


            if (
                selectedFile.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "Image should be smaller than 5 MB."
                );

                fileInput.value = "";

                selectedFile = null;

                return;

            }


            const reader =
                new FileReader();


            reader.onload = e => {

                preview.innerHTML = `

                    <img
                        src="${e.target.result}"
                        alt="Preview"
                    >

                `;

            };


            reader.readAsDataURL(
                selectedFile
            );

        }
    );


    /* PUBLISH */

    document
        .getElementById(
            "publishPost"
        )
        .onclick = async () => {

            const text =
                document
                    .getElementById(
                        "postText"
                    )
                    .value
                    .trim();


            if (
                text === "" &&
                !selectedFile
            ) {

                alert(
                    "Write something or select an image."
                );

                return;

            }


            const button =
                document.getElementById(
                    "publishPost"
                );


            button.disabled = true;

            button.textContent =
                "Uploading...";


            try {

                let imageURL = "";


                /* IMAGE UPLOAD */

                if (selectedFile) {

                    const fileName =
                        Date.now() +
                        "_" +
                        selectedFile.name;


                    const imageRef =
                        ref(
                            storage,
                            `posts/${currentUser.uid}/${fileName}`
                        );


                    await uploadBytes(
                        imageRef,
                        selectedFile
                    );


                    imageURL =
                        await getDownloadURL(
                            imageRef
                        );

                }


                /* SAVE POST */

                await addDoc(
                    collection(
                        db,
                        "posts"
                    ),
                    {

                        uid:
                            currentUser.uid,

                        name:
                            currentUser.displayName ||
                            "User",

                        text:
                            text,

                        imageURL:
                            imageURL,

                        likes:
                            [],

                        comments:
                            [],

                        createdAt:
                            serverTimestamp()

                    }
                );


                modal.remove();


                await loadPosts();


            } catch (error) {

                console.error(
                    error
                );


                alert(
                    "Post upload failed."
                );


                button.disabled =
                    false;


                button.textContent =
                    "Post";

            }

        };

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


    const likes =
        post.likes || [];


    const comments =
        post.comments || [];


    const liked =
        likes.includes(
            currentUser.uid
        );


    const article =
        document.createElement(
            "article"
        );


    article.className =
        "post-card firebase-post";


    const imageHTML =
        post.imageURL
        ? `

            <div class="post-image">

                <img
                    src="${post.imageURL}"
                    alt="Post image"
                >

            </div>

        `
        : "";


    article.innerHTML = `

        <div class="post-header">

            <div class="post-user">

                <img
                    src="${post.photoURL ||
                    "images/profile.jpg"}"
                    alt="User"
                >

                <div>

                    <h3>
                        ${escapeHTML(
                            post.name ||
                            "User"
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


        ${
            post.text
            ? `

                <div class="post-content">

                    <p>
                        ${escapeHTML(
                            post.text
                        )}
                    </p>

                </div>

            `
            : ""
        }


        ${imageHTML}


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


            <button>

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
                        src="${
                            comment.photoURL ||
                            "images/profile.jpg"
                        }"
                        alt="User"
                    >

                    <div
                        class="comment-content"
                    >

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

        feed.appendChild(
            article
        );

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


    const button =
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

            photoURL:
                currentUser.photoURL ||
                "",

            text:
                text

        };


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

    }


    button.addEventListener(
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

            if (
                navigator.share
            ) {

                try {

                    await navigator.share({

                        title:
                            "SocialHub",

                        text:
                            "Check out this post!"

                    });

                } catch (error) {

                    console.log(
                        "Share cancelled"
                    );

                }

            } else {

                alert(
                    "Share is not supported."
                );

            }

        }
    );

}


/* =========================================
   PROFILE PHOTO
========================================= */

function setupProfilePhoto() {

    const profile =
        document.querySelector(
            ".nav-profile"
        );


    if (!profile) return;


    profile.addEventListener(
        "contextmenu",
        event => {

            event.preventDefault();

            openProfileUpload();

        }
    );

}


/* =========================================
   PROFILE UPLOAD
========================================= */

function openProfileUpload() {

    const input =
        document.createElement(
            "input"
        );


    input.type = "file";

    input.accept =
        "image/*";


    input.onchange =
        async event => {

            const file =
                event.target.files[0];


            if (!file) return;


            if (
                !file.type
                    .startsWith("image/")
            ) {

                alert(
                    "Please select an image."
                );

                return;

            }


            if (
                file.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "Image should be smaller than 5 MB."
                );

                return;

            }


            try {

                alert(
                    "Uploading profile photo..."
                       );


                const fileName =
                    Date.now() +
                    "_" +
                    file.name;


                const imageRef =
                    ref(
                        storage,
                        `profiles/${currentUser.uid}/${fileName}`
                    );


                await uploadBytes(
                    imageRef,
                    file
                );


                const photoURL =
                    await getDownloadURL(
                        imageRef
                    );


                /* AUTH PROFILE */

                await updateProfile(
                    currentUser,
                    {
                        photoURL:
                            photoURL
                    }
                );


                /* FIRESTORE */

                await updateDoc(
                    doc(
                        db,
                        "users",
                        currentUser.uid
                    ),
                    {

                        photoURL:
                            photoURL

                    }
                );


                alert(
                    "Profile photo updated!"
                );


                await loadUserInfo();


            } catch (error) {

                console.error(
                    error
                );


                alert(
                    "Profile upload failed."
                );

            }

        };


    input.click();

}


/* =========================================
   UPLOAD MODAL CSS
========================================= */

function addUploadStyles() {

    if (
        document.getElementById(
            "uploadStyles"
        )
    ) return;


    const style =
        document.createElement(
            "style"
        );


    style.id =
        "uploadStyles";


    style.textContent = `

        .upload-modal {

            position: fixed;

            inset: 0;

            background:
                rgba(0,0,0,.55);

            display: flex;

            align-items: center;

            justify-content: center;

            padding: 20px;

            z-index: 5000;

        }


        .upload-box {

            width: 100%;

            max-width: 500px;

            background: white;

            border-radius: 14px;

            padding: 20px;

            box-shadow:
                0 10px 40px
                rgba(0,0,0,.25);

        }


        .upload-header {

            display: flex;

            align-items: center;

            justify-content:
                space-between;

            border-bottom:
                1px solid #e4e6eb;

            padding-bottom: 12px;

            margin-bottom: 15px;

        }


        .upload-header h2 {

            font-size: 20px;

        }


        .close-upload {

            width: 35px;

            height: 35px;

            border-radius: 50%;

            border: none;

            background:
                #f0f2f5;

            font-size: 22px;

            cursor: pointer;

        }


        #postText {

            width: 100%;

            height: 120px;

            border: none;

            outline: none;

            resize: none;

            font-size: 17px;

            padding: 10px 0;

        }


        .post-preview {

            max-height: 300px;

            overflow: hidden;

            border-radius: 10px;

            margin-bottom: 12px;

        }


        .post-preview img {

            width: 100%;

            max-height: 300px;

            object-fit: contain;

        }


        .image-select {

            display: block;

            text-align: center;

            border: 1px solid
                #e4e6eb;

            border-radius: 9px;

            padding: 12px;

            color: #45bd62;

            font-weight: 700;

            cursor: pointer;

        }


        .publish-btn {

            width: 100%;

            height: 45px;

            margin-top: 14px;

            border: none;

            border-radius: 8px;

            background: #1877f2;

            color: white;

            font-size: 15px;

            font-weight: 700;

            cursor: pointer;

        }


        .publish-btn:disabled {

            opacity: .6;

            cursor: not-allowed;

        }

    `;


    document.head.appendChild(
        style
    );

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
