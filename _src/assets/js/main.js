'use strict';

const finder = document.querySelector('.js__finder__container');
const seriesList = document.querySelector('.js__series__list');
const input = document.querySelector('.js__finder__input');

const favoriteList = document.querySelector('.series-favorite__list');

const resetFav = document.querySelector('.js__series-favourite__button');

//Si hay Stotage pintarlo y si no limpiar la página
let favs = localStorage.getItem('favs')
  ? JSON.parse(localStorage.getItem('favs'))
  : [];

if(favs.length) {
  resetFav.classList.remove('hidden');
}

//Cambiar la clase de los elementos al guardarlos en favoritos
function changeClass(event) {
  const element = event.currentTarget;
  element.classList.toggle('series__element--favorite');
}

//Buscar series en la Api
function searchSeries(event) {
  event.preventDefault();
  const seriesSearch = input.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${seriesSearch}`)
    .then(response => response.json())
    .then(series => {

      let arrSeries = [];

      for (let serie of series) {
        arrSeries.push({
          id: serie.show.id,
          title: serie.show.name,
          image: serie.show.image
            ? `url('${serie.show.image.medium}')`
            : `url('https://via.placeholder.com/210x295/ffffff/666666/?text=TV')`
        });
      }
      createSeries(seriesList, arrSeries,'series__element');

      const seriesElements = document.querySelectorAll('.series__element');

      for (let serieElement of seriesElements) {
        serieElement.addEventListener ('click', changeClass);
        serieElement.addEventListener('click', handleFavs);
      }
    });
}

//Función pintar Elementos
function createSeries(ol, series, className, hasButtons) {

  ol.innerHTML = '';

  for (const serie of series) {
    const serieElement = document.createElement('li');
    serieElement.classList.add(className);
    serieElement.dataset['id'] = serie.id;

    const serieImage = document.createElement('div');
    serieImage.classList.add(`${className}__img`);
    serieImage.style.backgroundImage = serie.image;

    const serieTitle = document.createElement('p');
    serieTitle.classList.add(`${className}__title`);
    serieTitle.innerHTML = serie.title;

    serieElement.appendChild(serieImage);
    serieElement.appendChild(serieTitle);
    ol.appendChild(serieElement);

    if(hasButtons) {
      const buttonRemoveSerie = document.createElement('button');
      buttonRemoveSerie.classList.add('js__button__remove__serie');
      buttonRemoveSerie.classList.add('button__remove__serie');
      buttonRemoveSerie.type = 'button';
      buttonRemoveSerie.innerHTML = 'X';
      buttonRemoveSerie.dataset['id'] = serie.id;
      serieElement.appendChild(buttonRemoveSerie);
      buttonRemoveSerie.addEventListener('click', handleFavs);
    }
  }
}

//Guardar en favoritos
function handleFavs(event) {
  const itemLi = event.currentTarget;
  const id = itemLi.dataset['id'];

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

  createSeries(favoriteList,favs,'series-favorite__element', true);

  if (favs.length) {
    resetFav.classList.remove('hidden');
  } else {
    resetFav.classList.add('hidden');
  }

  localStorage.setItem('favs',JSON.stringify(favs));
}

//Reset favoritos
function resetFavElements(){
  resetFav.classList.add('hidden');
  favoriteList.innerHTML = '';
  favs = [];
  localStorage.setItem('favs',JSON.stringify(favs));
}


createSeries(favoriteList,favs,'series-favorite__element', true);

resetFav.addEventListener('click', resetFavElements);

finder.addEventListener('submit',searchSeries);


