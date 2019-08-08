'use strict';

const finder = document.querySelector('.js__finder__container');

function searchSeries(event) {
  event.preventDefault();
  console.log('funciono');
}




finder.addEventListener('submit', searchSeries);
