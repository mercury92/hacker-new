import React, { useEffect, useState } from "react";
import localStorageService from "../service/localStorageService";

function Content({ news }) {
  if (news.length === 0) {
    return <div>Loading ... </div>;
  }

  let values = [];

  const addFav = (e, id) => {
    e.preventDefault();
    values = localStorageService.getFavNewsLocal("localFavNews");
    if (values !== null) {
      values.push(id);
      localStorageService.setFavNewsLocal(values);
      console.log(localStorageService.getFavNewsLocal());
    } else {
      localStorageService.setFavNewsLocal([id]);
    }
  };


  return (
    <div>
      <div className="content">
        {news.map((n) => (
          <div className="card" key={n.id}>
            <div className="content-img">
              <div className="favorite">
                <button 
                  onClick={(e) => {
                    addFav(e, n,n.id);
                    n.touch = true;

                  }}
                  className={n.touch==true?'heart-focus':'null'}
                >
                  <div className="heart" ></div>
                </button>
              </div>
              <img className="card-img"></img>
            </div>
            <a href={n.url} target="_blank">
              <div className="content-text">{n.title}</div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
