'use strict';

//const finder = document.querySelector('.js__finder__container');
const finder = document.querySelector('.js__finder__search');
const seriesList = document.querySelector('.js__series__list');
const input = document.querySelector('.js__finder__input');

function searchSeries() {
  const seriesSearch = input.value;
  seriesList.innerHTML= '';

  fetch(`http://api.tvmaze.com/search/shows?q=${seriesSearch}`)
    .then(response => response.json())
    .then(series => {
      console.log(series);
      /*for (const serie of series) {
        const elementResult = document.createElement('li');
        elementResult.classList.add('series__element');

        const imageResult = document.createElement('div');
        imageResult.classList.add('series__element__img');
        imageResult.style.backgroundImage = `url('${series.show.image.medium}')`;

        const titleResult = document.createElement('p');
        titleResult.classList.add('series__element__title');
        titleResult.innerHTML = series.show.name;

        elementResult.appendChild(imageResult);
        elementResult.appendChild(titleResult);
        seriesList.appendChild(elementResult);
      }*/
    });
}

searchSeries();

finder.addEventListener('click',searchSeries);

