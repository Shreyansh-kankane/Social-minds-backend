import Post from "../models/Post.js";
import User from "../models/User.js";
// import { initFirebase } from "../firebase.js";
// import { getStorage,ref, deleteObject } from 'firebase/storage'; 
// const storage  = getStorage();

/* CREATE */
export const createPost = async (req, res,picturePath) => {
  try {
    const { userId, description } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find().sort({ $natural: -1 });
    // console.log(post);
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find().sort({ $natural: -1 });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

//delete
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.find({ postId });
    if (!post) {
      return res.status(401).json("post doesnot exist");
    }
    // const postUserId = req.body.userId;
    // if (postUserId !== req.user.id) {
    //   return res.status(401).json("invalid user");
    // }
    const deletedPost = await Post.findByIdAndDelete(postId);
    // console.log(deletePost);

    res.status(200).json(deletedPost);
    return;

  } catch (error) {
    // console.log(error.message);
    res.status(500).json({ error: error.message });
    return;
  }
}

// import { getStorage, ref, deleteObject } from "firebase/storage";

// const storage = getStorage();

// // Create a reference to the file to delete
// const desertRef = ref(storage, 'images/desert.jpg');

// // Delete the file
// deleteObject(desertRef).then(() => {
//   // File deleted successfully
// }).catch((error) => {
//   // Uh-oh, an error occurred!
// });

// const imagePath = getPathStorageFromUrl(url);
// console.log(imagePath);

// function getPathStorageFromUrl(url) {
//   const baseUrl = "https://firebasestorage.googleapis.com/v0/b/social-minds.appspot.com/o/";
//   let imagePath = url.replace(baseUrl, "");
//   const indexOfEndPath = imagePath.indexOf("?");
//   imagePath = imagePath.substring(0, indexOfEndPath);
//   imagePath = imagePath.replace("%2F", "/");
//   return imagePath;
// }