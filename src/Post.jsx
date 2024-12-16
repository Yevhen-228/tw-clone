import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@mui/material";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import FavoriteIcon from "@mui/icons-material/Favorite"; // Иконка лайка (заполненная)
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder"; // Иконка лайка (пустая)
import PublishIcon from "@mui/icons-material/Publish";
import { db } from "./firebase";
import { doc, updateDoc, increment } from "firebase/firestore"; // Firebase для обновления

const Post = forwardRef(
  ({ id, displayName, username, verified, text, image, avatar, likes = 0 }, ref) => {
    const handleLike = async () => {
      const postRef = doc(db, "posts", id); // Получаем ссылку на документ поста
      try {
        await updateDoc(postRef, {
          likes: increment(1), // Увеличиваем поле `likes` на 1
        });
      } catch (error) {
        console.error("Ошибка при обновлении лайков:", error);
      }
    };

    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          {image && <img src={image} alt="Tweet" />}
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <div onClick={handleLike} className="post__likeButton">
              {likes > 0 ? <FavoriteIcon fontSize="small" /> : <FavoriteBorderIcon fontSize="small" />}
              <span>{likes}</span>
            </div>
            <PublishIcon fontSize="small" />
          </div>
        </div>
      </div>
    );
  }
);

export default Post;