# YouTube_Clone

Git Link:- https://github.com/arjunchuhan6/YouTube_Clone

The YouTube Clone project is a web application built using the MERN stack, which includes MongoDB, Express, React, and Node.js. It replicates core functionalities of YouTube, allowing users to interact with video content.


## Features

- **User Registration and Login**
  - Users can create an account and log in.
  - JWT authentication is used for securing routes.
  
- **Channels**
  - Users can create their own channels.
  - Each channel can host multiple videos.
  
- **Video Upload**
  - Users can upload videos to their channels with a title, description, URL, and category.
  
- **Video Viewing**
  - Users can view videos from channels and leave comments.
  - Users can like or dislike videos.
  
- **Comments**
  - Users can comment on videos, and comments are displayed below each video.
  - Users can edit and delete a comment.
  
- **Like/Dislike Functionality**
  - Videos can be liked or disliked by users.

- **Search Functionality**
  - User can search video based on title and category

    -*Technical skill*

    - **Frontend**: 
        -React.js
        -React Router 
        -Axios 
        -TailwindCSS

    - **Backend**: 
        -Node.js 
        -Express.js

    - **Database**: 
        -MongoDB

    - **Authentication**: 
        -JWT (JSON Web Token)

    - **Version Control**: 
        -Git

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/arjunchuhan6/YouTube_Clone.git

2. Install dependencies for both the frontend and backend

3. Set up environment variables

4. Start the development servers

5. Access the application:
  - The frontend should be running on http://localhost:5173
  - The backend API will be running on http://localhost:5000

## *API Endpoints*

**Home**

    -GET /video - Fetch all videos.

**Authentication**

    -POST /register - User registration.
    -POST /login - User login.

**Channels**

    -GET /channels - Get all channels.
    -POST /addchannel - Create a new channel.
    -DELETE /deletechannel - Delete a channel.

**Videos**

    -PATCH /addVideo/:id - Upload a video to a channel.
    -PATCH /editVideo/:id - Edit video details.
    -DELETE /deleteVideo/:id - Delete a video.

**Comments**

    -PATCH /video/:videoId - Add a comment to a video.
    -PATCH /editcomment/:videoId - Edit a comment.
    -DELETE /deletecomment/:videoId - Delete a comment.