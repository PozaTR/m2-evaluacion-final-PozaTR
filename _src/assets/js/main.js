'use strict';

//const finder = document.querySelector('.js__finder__container');
const finder = document.querySelector('.js__finder__search');
const seriesList = document.querySelector('.js__series__list');
const input = document.querySelector('.js__finder__input');

const favoriteList = document.querySelector('.series-favorite__list');

//Guardar en favoritos

let favs = [];

function handleFavs(event) {
  const item = event.currentTarget;
  const id = item.dataset['id'];
  const title = item.querySelector('.series__element__title').innerHTML;
  const image = item.querySelector('.series__element__img').style.backgroundImage;
  favs.push({id, title, image});
  console.log(favs);

  item.classList.toggle('series-favorite__element');
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

