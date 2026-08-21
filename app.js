/* ========================================
   SOCIALHUB - JAVASCRIPT
   PART 3
======================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================
       LIKE BUTTON
    ====================================== */

    const likeButtons = document.querySelectorAll(".post-actions button");

    likeButtons.forEach(button => {

        const text = button.innerText.trim();

        if (text.includes("Like")) {

            button.addEventListener("click", () => {

                const icon = button.querySelector("i");

                if (button.classList.contains("liked")) {

                    button.classList.remove("liked");

                    icon.classList.remove("fa-solid");
                    icon.classList.add("fa-regular");

                    button.style.color = "";

                } else {

                    button.classList.add("liked");

                    icon.classList.remove("fa-regular");
                    icon.classList.add("fa-solid");

                    button.style.color = "#1877f2";
                }

            });

        }

    });



    /* =====================================
       COMMENT SYSTEM
    ====================================== */

    const commentBoxes =
        document.querySelectorAll(".comment-box");

    commentBoxes.forEach(box => {

        const input = box.querySelector("input");
        const button = box.querySelector("button");

        function addComment() {

            const commentText = input.value.trim();

            if (commentText === "") {
                return;
            }

            const comment = document.createElement("div");

            comment.className = "new-comment";

            comment.innerHTML = `
                <img src="images/profile.jpg" alt="Profile">

                <div class="comment-content">
                    <strong>Bablu Kumar</strong>
                    <p>${escapeHTML(commentText)}</p>
                </div>
            `;

            box.parentElement.insertBefore(
                comment,
                box
            );

            input.value = "";

        }


        button.addEventListener("click", addComment);


        input.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                addComment();
            }

        });

    });



    /* =====================================
       COMMENT CSS DYNAMICALLY
    ====================================== */

    const commentStyle = document.createElement("style");

    commentStyle.textContent = `

        .new-comment {
            display: flex;
            align-items: flex-start;
            gap: 8px;
            padding: 5px 15px 10px;
        }

        .new-comment img {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            object-fit: cover;
        }

        .comment-content {
            background: #f0f2f5;
            border-radius: 12px;
            padding: 7px 11px;
            max-width: 80%;
        }

        .comment-content strong {
            display: block;
            font-size: 12px;
            margin-bottom: 3px;
        }

        .comment-content p {
            font-size: 13px;
            word-break: break-word;
        }

    `;

    document.head.appendChild(commentStyle);



    /* =====================================
       CREATE POST
    ====================================== */

    const postInput =
        document.querySelector(".post-input");


    if (postInput) {

        postInput.addEventListener("click", () => {

            openPostModal();

        });

    }



    /* =====================================
       CREATE POST MODAL
    ====================================== */

    function openPostModal() {

        const modal = document.createElement("div");

        modal.className = "post-modal";

        modal.innerHTML = `

            <div class="post-modal-box">

                <div class="modal-header">

                    <h2>Create Post</h2>

                    <button class="close-modal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                </div>

                <div class="modal-user">

                    <img
                        src="images/profile.jpg"
                        alt="Profile"
                    >

                    <div>
                        <strong>Bablu Kumar</strong>
                        <small>
                            <i class="fa-solid fa-earth-americas"></i>
                            Public
                        </small>
                    </div>

                </div>

                <textarea
                    id="newPostText"
                    placeholder="What's on your mind?"
                ></textarea>

                <div
                    class="image-preview"
                    id="imagePreview"
                ></div>

                <div class="post-modal-options">

                    <label for="postImage">
                        <i class="fa-solid fa-image"></i>
                        Photo
                    </label>

                    <input
                        type="file"
                        id="postImage"
                        accept="image/*"
                        hidden
                    >

                    <button>
                        <i class="fa-solid fa-face-smile"></i>
                        Feeling
                    </button>

                </div>

                <button
                    class="publish-post"
                    id="publishPost"
                >
                    Post
                </button>

            </div>

        `;


        document.body.appendChild(modal);


        /* =================================
           MODAL CSS
        ================================= */

        const style = document.createElement("style");

        style.textContent = `

            .post-modal {
                position: fixed;
                inset: 0;
                background: rgba(0,0,0,.55);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
                z-index: 5000;
            }

            .post-modal-box {
                background: white;
                width: 100%;
                max-width: 500px;
                border-radius: 14px;
                padding: 18px;
                box-shadow: 0 10px 40px rgba(0,0,0,.25);
            }

            .modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 1px solid #e4e6eb;
                padding-bottom: 12px;
            }

            .modal-header h2 {
                font-size: 19px;
            }

            .close-modal {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                background: #f0f2f5;
                font-size: 18px;
            }

            .modal-user {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 15px 0;
            }

            .modal-user img {
                width: 42px;
                height: 42px;
                border-radius: 50%;
                object-fit: cover;
            }

            .modal-user strong {
                display: block;
                font-size: 14px;
            }

            .modal-user small {
                display: block;
                margin-top: 4px;
                color: #65676b;
                font-size: 11px;
            }

            #newPostText {
                width: 100%;
                height: 120px;
                resize: none;
                border: none;
                outline: none;
                font-size: 17px;
                padding: 10px 0;
            }

            .image-preview {
                max-height: 250px;
                overflow: hidden;
                border-radius: 10px;
            }

            .image-preview img {
                width: 100%;
                max-height: 250px;
                object-fit: contain;
            }

            .post-modal-options {
                display: flex;
                align-items: center;
                gap: 15px;
                border: 1px solid #e4e6eb;
                border-radius: 10px;
                padding: 12px;
                margin-top: 10px;
            }

            .post-modal-options label,
            .post-modal-options button {
                background: transparent;
                color: #65676b;
                font-weight: 600;
                cursor: pointer;
            }

            .post-modal-options label i {
                color: #45bd62;
                margin-right: 5px;
            }

            .post-modal-options button i {
                color: #f7b928;
                margin-right: 5px;
            }

            .publish-post {
                width: 100%;
                margin-top: 15px;
                height: 42px;
                border-radius: 8px;
                background: #1877f2;
                color: white;
                font-size: 15px;
                font-weight: 700;
            }

            .publish-post:hover {
                background: #166fe5;
            }

        `;

        document.head.appendChild(style);



        /* =================================
           CLOSE MODAL
        ================================= */

        modal.querySelector(".close-modal")
            .addEventListener("click", () => {

                modal.remove();

            });



        /* =================================
           IMAGE PREVIEW
        ================================= */

        const imageInput =
            modal.querySelector("#postImage");

        const imagePreview =
            modal.querySelector("#imagePreview");


        imageInput.addEventListener("change", event => {

            const file = event.target.files[0];

            if (!file) {
                return;
            }

            const reader = new FileReader();

            reader.onload = e => {

                imagePreview.innerHTML = `
                    <img
                        src="${e.target.result}"
                        alt="Preview"
                    >
                `;

            };

            reader.readAsDataURL(file);

        });



        /* =================================
           PUBLISH POST
        ================================= */

        modal.querySelector("#publishPost")
            .addEventListener("click", () => {

                const text =
                    modal.querySelector("#newPostText")
                        .value
                        .trim();

                const image =
                    imagePreview.querySelector("img");


                if (text === "" && !image) {

                    alert("Please write something or select an image.");

                    return;

                }


                createNewPost(
                    text,
                    image ? image.src : null
                );


                modal.remove();

            });

    }



    /* =====================================
       CREATE NEW POST
    ====================================== */

    function createNewPost(text, image) {

        const feed =
            document.querySelector(".feed");


        const createPost =
            document.querySelector(".create-post");


        const stories =
            document.querySelector(".stories-section");


        const post =
            document.createElement("article");


        post.className = "post-card";


        post.innerHTML = `

            <div class="post-header">

                <div class="post-user">

                    <img
                        src="images/profile.jpg"
                        alt="Bablu Kumar"
                    >

                    <div>

                        <h3>Bablu Kumar</h3>

                        <p>
                            Just now ·
                            <i class="fa-solid fa-earth-americas"></i>
                        </p>

                    </div>

                </div>

                <button class="more-btn">
                    <i class="fa-solid fa-ellipsis"></i>
                </button>

            </div>


            ${
                text
                ? `
                    <div class="post-content">
                        <p>${escapeHTML(text)}</p>
                    </div>
                  `
                : ""
            }


            ${
                image
                ? `
                    <div class="post-image">
                        <img
                            src="${image}"
                            alt="Post"
                        >
                    </div>
                  `
                : ""
            }


            <div class="post-stats">

                <span>
                    <i class="fa-solid fa-thumbs-up"></i>
                    0
                </span>

                <span>
                    0 Comments · 0 Shares
                </span>

            </div>


            <div class="post-actions">

                <button>
                    <i class="fa-regular fa-thumbs-up"></i>
                    Like
                </button>

                <button>
                    <i class="fa-regular fa-comment"></i>
                    Comment
                </button>

                <button class="share-btn">
                    <i class="fa-solid fa-share"></i>
                    Share
                </button>

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
                    <i class="fa-solid fa-paper-plane"></i>
                </button>

            </div>

        `;


        feed.insertBefore(
            post,
            feed.querySelector(".post-card")
        );


        activatePost(post);

    }



    /* =====================================
       ACTIVATE NEW POST
    ====================================== */

    function activatePost(post) {

        const likeButton =
            post.querySelector(".post-actions button");


        likeButton.addEventListener("click", () => {

            const icon =
                likeButton.querySelector("i");


            if (likeButton.classList.contains("liked")) {

                likeButton.classList.remove("liked");

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

                likeButton.style.color = "";

            } else {

                likeButton.classList.add("liked");

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

                likeButton.style.color = "#1877f2";

            }

        });


        /* COMMENT */

        const commentBox =
            post.querySelector(".comment-box");

        const input =
            commentBox.querySelector("input");

        const button =
            commentBox.querySelector("button");


        function addNewComment() {

            const text = input.value.trim();

            if (!text) {
                return;
            }


            const comment =
                document.createElement("div");

            comment.className =
                "new-comment";


            comment.innerHTML = `

                <img
                    src="images/profile.jpg"
                    alt="Profile"
                >

                <div class="comment-content">

                    <strong>Bablu Kumar</strong>

                    <p>${escapeHTML(text)}</p>

                </div>

            `;


            post.insertBefore(
                comment,
                commentBox
            );


            input.value = "";

        }


        button.addEventListener(
            "click",
            addNewComment
        );


        input.addEventListener(
            "keydown",
            event => {

                if (event.key === "Enter") {
                    addNewComment();
                }

            }
        );


        /* SHARE */

        const shareButton =
            post.querySelector(".share-btn");


        if (shareButton) {

            shareButton.addEventListener(
                "click",
                async () => {

                    const shareData = {
                        title: "SocialHub",
                        text: "Check out this post on SocialHub!"
                    };


                    if (
                        navigator.share
                    ) {

                        try {

                            await navigator.share(
                                shareData
                            );

                        } catch (error) {

                            console.log(
                                "Share cancelled"
                            );

                        }

                    } else {

                        alert(
                            "Share feature is not supported on this browser."
                        );

                    }

                }
            );

        }

    }



    /* =====================================
       SHARE EXISTING POSTS
    ====================================== */

    document.querySelectorAll(".post-card")
        .forEach(post => {

            const buttons =
                post.querySelectorAll(
                    ".post-actions button"
                );


            if (buttons.length >= 3) {

                buttons[2].addEventListener(
                    "click",
                    async () => {

                        if (navigator.share) {

                            try {

                                await navigator.share({
                                    title: "SocialHub",
                                    text: "Check out this post!"
                                });

                            } catch (error) {

                                console.log(
                                    "Share cancelled"
                                );

                            }

                        } else {

                            alert(
                                "Share is not supported on this browser."
                            );

                        }

                    }
                );

            }

        });



    /* =====================================
       SEARCH
    ====================================== */

    const searchInput =
        document.querySelector(
            ".search-box input"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const query =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                const posts =
                    document.querySelectorAll(
                        ".post-card"
                    );


                posts.forEach(post => {

                    const content =
                        post.innerText
                            .toLowerCase();


                    if (
                        query === "" ||
                        content.includes(query)
                    ) {

                        post.style.display = "";
                      }

                });

            }
        );

    }



    /* =====================================
       NAV ITEM ACTIVE STATE
    ====================================== */

    const navItems =
        document.querySelectorAll(".nav-item");


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            event => {

                event.preventDefault();


                navItems.forEach(nav => {

                    nav.classList.remove(
                        "active"
                    );

                });


                item.classList.add("active");

            }
        );

    });



    /* =====================================
       ESCAPE HTML
    ====================================== */

    function escapeHTML(value) {

        const div =
            document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }

});

  
