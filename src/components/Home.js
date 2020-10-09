import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import localStorageService from "../service/localStorageService";
import Content from "./Content";
import Favorite from "./Favorite";
import Header from "./Header";

function Home() {
  const [showAll, setShowAll] = React.useState(true);
  const [news, setNews] = React.useState([]);
  const [favoriteNews, setFavoriteNews] = React.useState([]);
  const values = localStorageService.getFavNewsLocal();
  
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      if (localStorageService.getNews("localNews")) {
        setNews(localStorageService.getNews("localNews"));
      } else {
        const response = await axios.get(`/topstories.json?print=pretty`);
        console.log("res", response.statusText);
        if (response.statusText === false) {
          throw new Error("Error" + response.text);
        }
        const topNews = await response.data;
        const promises = topNews
          .slice(0, 9)
          .map((id) =>
            axios.get(`/item/${id}.json`).then((response) => response.data)
          );

        const result = await Promise.all(promises);
        setNews(result);

        localStorageService.storeNews(result);
        const localNews = localStorageService.getNews("localNews");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Header/>
      <div className="home-content">
        <div className="home-content-tab">
          <button onClick={() => setShowAll(true)} className={showAll===true?'button-focus':null}>All</button>
          <button onClick={() => setShowAll(false)} className={showAll===false?'button-focus':null}>Favorite</button>
        </div>
        <div className="hamehome-content-list">
          {showAll ? <Content news={news} /> : <Favorite news={news} />}
        </div>
      </div>
    </div>
  );
}

export default Home;
