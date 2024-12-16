import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@mui/material";
import { db } from './firebase'; // Импорт Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // Функции Firestore

function TweetBox({ onNewTweet }) { // Передаем колбэк для обновления твитов
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = async (e) => {
    e.preventDefault();

    if (tweetMessage.trim()) {
      const newTweet = {
        displayName: "Yevhen Dyomin",
        username: "YDyomin",
        verified: true,
        text: tweetMessage,
        image: tweetImage,
        avatar: "https://cakeshop.com.ua/images/AcpSe7kFpmzMfgJUwhyXbNbja_gwkleunua5ZVM9jTQ/h:5000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC81NzEzXzEuanBn",
        timestamp: serverTimestamp(), // Добавляем метку времени
      };

      try {
        await addDoc(collection(db, "posts"), newTweet); // Сохраняем твит в Firestore
        onNewTweet(newTweet); // Вызываем колбэк для обновления списка
        setTweetMessage(""); // Очищаем форму
        setTweetImage("");
      } catch (error) {
        console.error("Ошибка при добавлении твита:", error);
      }
    }
  };

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://cakeshop.com.ua/images/AcpSe7kFpmzMfgJUwhyXbNbja_gwkleunua5ZVM9jTQ/h:5000/bG9jYWw/6Ly8vY2FrZXNob3AuY29tLnVhL3B1YmxpY19odG1sL3N0b3JhZ2UvYXBwL3B1YmxpYy9pbWcvcHJvZHVjdC81NzEzXzEuanBn" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
