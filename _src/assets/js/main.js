'use strict';

//const finder = document.querySelector('.js__finder__container');
const finder = document.querySelector('.js__finder__search');
const seriesList = document.querySelector('.js__series__list');
const input = document.querySelector('.js__finder__input');

const favoriteList = document.querySelector('.series-favorite__list');

let favs = localStorage.getItem('favs')
  ? JSON.parse(localStorage.getItem('favs'))
  : [];

//Pintar Favoritos
function paintFavs() {
  favoriteList.innerHTML = '';

  for (const favSerie of favs) {
    const favElementResult = document.createElement('li');
    favElementResult.classList.add('series-favorite__element');
    favElementResult.dataset['id'] = favSerie.id;

    const favImageResult = document.createElement('div');
    favImageResult.classList.add('series-favorite__element__img');
    favImageResult.style.backgroundImage = favSerie.image;

    const favTitleResult = document.createElement('p');
    favTitleResult.classList.add('series-favorite__element__title');
    favTitleResult.innerHTML = favSerie.title;

    favElementResult.appendChild(favImageResult);
    favElementResult.appendChild(favTitleResult);
    favoriteList.appendChild(favElementResult);
  }
}
paintFavs();

//Guardar en favoritos
function handleFavs(event) {
  const itemLi = event.currentTarget;
  const id = itemLi.dataset['id'];

  itemLi.classList.toggle('series-favorite__element');

  function findSeriebyId(fav) {
    return fav.id === id;
  }

  const index = favs.findIndex(findSeriebyId);

  if( index >= 0) {
    favs.splice(index, 1);
  } else {
    const title = itemLi.querySelector('.series__element__title').innerHTML;
    const image = itemLi.querySelector('.series__element__img').style.backgroundImage;
    favs.push({id, title, image});
  }

  paintFavs();

  localStorage.setItem('favs',JSON.stringify(favs));
}

//Buscar series en la Api
function searchSeries() {
  const seriesSearch = input.value;
  seriesList.innerHTML= '';
  fetch(`http://api.tvmaze.com/search/shows?q=${seriesSearch}`)
    .then(response => response.json())
    .then(series => {
      for (const serie of series) {
        const elementResult = document.createElement('li');
        elementResult.classList.add('series__element');
        elementResult.dataset['id'] = serie.show.id;

        const imageResult = document.createElement('div');
        imageResult.classList.add('series__element__img');

        if (serie.show.image) {
          imageResult.style.backgroundImage = `url('${serie.show.image.medium}')`;
        }
        else {
          imageResult.style.backgroundImage = `url('https://via.placeholder.com/75x100.png?text=no+hay+imagen')`;
        }

        const titleResult = document.createElement('p');
        titleResult.classList.add('series__element__title');
        titleResult.innerHTML = serie.show.name;

        elementResult.appendChild(imageResult);
        elementResult.appendChild(titleResult);
        seriesList.appendChild(elementResult);

        elementResult.addEventListener('click', handleFavs);
      }
    });
}

searchSeries();

finder.addEventListener('click',searchSeries);

//Guardar en favoritos

