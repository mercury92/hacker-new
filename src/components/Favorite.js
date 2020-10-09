import React, { useEffect, useState } from "react";
import localStorageService from "../service/localStorageService";

function Favorite({ news }) {
  const [favNews, setFavNews] = useState([]);

  const removeFav = (e,delNews) => {
    console.log(delNews)
    values = values.filter((news)=>news.id!==delNews)
    localStorageService.setFavNewsLocal(values);
  };

  let values = localStorageService.getFavNewsLocal();

  

  return (
    <div>
      <div className="content">
        {values?values.map((news) => (
          <div className="card" key={news.id}>
            <div className="content-img">
              <div className="favorite">
                <button onClick={(e) =>{ removeFav(e,news.id);news.touch=false;}}>
                  <div className="heart"></div>
                </button>
              </div>
              <img className="card-img"></img>
            </div>
            <a href={news.url} target="_blank">
              <div className="content-text">{news.title}</div>
            </a>
          </div>
        )):<div>you have no favorite news</div>}
      </div>
    </div>
  );
}

export default Favorite;
