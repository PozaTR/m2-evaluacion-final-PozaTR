'use strict';

//const finder = document.querySelector('.js__finder__container');
const finder = document.querySelector('.js__finder__search');
const seriesList = document.querySelector('.js__series__list');
const input = document.querySelector('.js__finder__input');

//Guardar en favoritos

let favs = [];

function handleFavs(event) {
  const item = event.currentTarget;
  const name = item.querySelector.name
  item.classList.toggle('series-favorite__element');
  if (item.classList.contains('series-favorite__element')) {
    // lo guardo en el array solo si no existe

    if (favs.includes(name) === false) {
      favs.push(name);
    }

  } else {
    // lo quito del array
    const index = favs.indexOf(name);
    if (index > -1) {
      favs.splice(index, 1);
    }
  }
  console.log(favs);
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

        const saveFavorites = document.querySelectorAll('.series__element');

        for (let i=0;i<saveFavorites.length;i++) {
          saveFavorites[i].addEventListener('click', handleFavs);
        }
      }
    });
}

searchSeries();

finder.addEventListener('click',searchSeries);

//Guardar en favoritos

//const favoriteListe = document.querySelector('.series-favorite__list');

//seriesList.addEventListener('click', moveFavorite);
