import React, { useState, useEffect } from "react";
import "./Widgets.css";
import { Search as SearchIcon } from "@mui/icons-material";
import Post from "./Post"; // Импорт компонента Post для отображения твитов
import { db } from "./firebase"; // Firebase: используется для подключения к базе данных Firestore.
import { collection, onSnapshot } from "firebase/firestore"; // Для работы с Firestore
import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,     // TwitterTimelineEmbed и TwitterTweetEmbed: библиотеки для встраивания твитов и ленты из Twitter.
} from "react-twitter-embed"; // Для встроенных твитов и таймлайна

function Widgets() {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  // Загружаем твиты из Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
      const fetchedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
      setFilteredPosts(fetchedPosts); // Изначально показываем все посты
    });

    return () => unsubscribe();
  }, []);

  // Фильтруем посты при изменении строки поиска
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = posts.filter(
      (post) =>
        post.text.toLowerCase().includes(lowercasedQuery) ||
        post.displayName.toLowerCase().includes(lowercasedQuery) ||
        post.username.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPosts(filtered);
  }, [searchQuery, posts]);

  return (
    <div className="widgets">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input
          placeholder="Search Tweets"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Обновляем строку поиска
        />
      </div>

      <div className="widgets__widgetContainer">
        {!searchQuery ? (
          <>
            <h2>What's happening 2</h2>
            <TwitterTweetEmbed tweetId={"1865434273953509462"} />

            <TwitterTweetEmbed tweetId={"1865063763369467957"} />

            <TwitterTimelineEmbed
              sourceType="profile"
              screenName="cleverqazi"
              options={{ height: 400 }}
            />
          </>
        ) : (
          <>
            <h2 className="widgets__searchResultsTitle">Search Results</h2>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Post
                  key={post.id}
                  id={post.id}
                  displayName={post.displayName}
                  username={post.username}
                  verified={post.verified}
                  text={post.text}
                  avatar={post.avatar}
                  image={post.image}
                  likes={post.likes || 0}
                />
              ))
            ) : (
              <p className="widgets__noResults">No tweets found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Widgets;