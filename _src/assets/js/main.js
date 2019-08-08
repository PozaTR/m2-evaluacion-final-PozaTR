'use strict';

//const finder = document.querySelector('.js__finder__container');
const finder = document.querySelector('.js__finder__search');
const seriesList = document.querySelector('.series__list');
const input = document.querySelector('.js__finder__input');

function searchSeries() {
  const seriesSearch = input.value;
  seriesList.innerHTML= '';
  fetch(`http://api.tvmaze.com/search/shows?q=${seriesSearch}`)
    .then(response => response.json())
    .then(series => {
      console.log(series);
    });
}

searchSeries();

finder.addEventListener('click',searchSeries);

