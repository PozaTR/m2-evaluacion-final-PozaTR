"use strict";const finder=document.querySelector(".js__finder__container"),seriesList=document.querySelector(".js__series__list"),input=document.querySelector(".js__finder__input"),favoriteList=document.querySelector(".series-favorite__list"),resetFav=document.querySelector(".js__series-favourite__button");let favs=localStorage.getItem("favs")?JSON.parse(localStorage.getItem("favs")):[];function changeClass(e){e.currentTarget.classList.toggle("series__element--favorite")}function searchSeries(e){e.preventDefault();const t=input.value;fetch(`http://api.tvmaze.com/search/shows?q=${t}`).then(e=>e.json()).then(e=>{let t=[];for(let s of e)t.push({id:s.show.id,title:s.show.name,image:s.show.image?`url('${s.show.image.medium}')`:"url('https://via.placeholder.com/210x295/ffffff/666666/?text=TV')"});createSeries(seriesList,t,"series__element");const s=document.querySelectorAll(".series__element");for(let e of s)e.addEventListener("click",changeClass),e.addEventListener("click",handleFavs)})}function createSeries(e,t,s,i){e.innerHTML="";for(const a of t){const t=document.createElement("li");t.classList.add(s),t.dataset.id=a.id;const n=document.createElement("div");n.classList.add(`${s}__img`),n.style.backgroundImage=a.image;const r=document.createElement("p");if(r.classList.add(`${s}__title`),r.innerHTML=a.title,t.appendChild(n),t.appendChild(r),e.appendChild(t),i){const e=document.createElement("button");e.classList.add("js__button__remove__serie"),e.classList.add("button__remove__serie"),e.type="button",e.innerHTML="X",e.dataset.id=a.id,t.appendChild(e),e.addEventListener("click",handleFavs)}}}function handleFavs(e){const t=e.currentTarget,s=t.dataset.id;const i=favs.findIndex(function(e){return e.id===s});if(i>=0)favs.splice(i,1);else{const e=t.querySelector(".series__element__title").innerHTML,i=t.querySelector(".series__element__img").style.backgroundImage;favs.push({id:s,title:e,image:i})}createSeries(favoriteList,favs,"series-favorite__element",!0),favs.length?resetFav.classList.remove("hidden"):resetFav.classList.add("hidden"),localStorage.setItem("favs",JSON.stringify(favs))}function resetFavElements(){resetFav.classList.add("hidden"),favoriteList.innerHTML="",favs=[],localStorage.setItem("favs",JSON.stringify(favs))}favs.length&&resetFav.classList.remove("hidden"),createSeries(favoriteList,favs,"series-favorite__element",!0),resetFav.addEventListener("click",resetFavElements),finder.addEventListener("submit",searchSeries);