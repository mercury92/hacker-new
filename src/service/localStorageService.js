function storeNews(news) {
  return localStorage.setItem("localNews", JSON.stringify(news));
}

function getNews() {
  return JSON.parse(localStorage.getItem("localNews"));
}

function setFavNewsLocal(favNews) {
  return localStorage.setItem("localFavNews", JSON.stringify(favNews));
}
function getFavNewsLocal() {
  return JSON.parse(localStorage.getItem("localFavNews"));
}

export default {
  storeNews,
  getNews,
  setFavNewsLocal,
  getFavNewsLocal,
};
