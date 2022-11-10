import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchPictures } from "./fetchPictures";

const refs = {
    form: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};



fetchPictures('red').then(response => {
    if (response.length === 0) {
        // console.log(response);
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        return
    } else {
        // const value = response.data.hits;
        const markup = response.map((value) => {
            const { webformatURL, tags } = value
            return `<div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" />
      <div class="info">
        <p class="info-item">
          <b>Likes</b>
        </p>
        <p class="info-item">
          <b>Views</b>
        </p>
        <p class="info-item">
          <b>Comments</b>
        </p>
        <p class="info-item">
          <b>Downloads</b>
        </p>
      </div>
    </div>`})
            .join("");
        refs.gallery.innerHTML = markup;
        // console.log(markup)
    }


});




// window.addEventListener('scroll', () => {
//     // console.log(scrollHeight) высота всего документа
//     // scrollTop скродд от верха в пикселях
//     // clientHeight высота вьюпорта

//     scrollHeight - clientHeight === scrollTop

//     scrollHeight - scrollTop === clientHeight

// }