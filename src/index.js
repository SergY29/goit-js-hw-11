import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchPictures } from "./fetchPictures";

const refs = {
  form: document.querySelector('#search-form'),
  divGallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearch)


function onSearch(e) {
  e.preventDefault();
  value = e.currentTarget.elements.searchQuery.value;

  fetchPictures(value)
    .then(createMarkup);


};

function createMarkup(response) {
  if (response.length === 0) {
    Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
    return
  } else {
    const markup = response.map((value) => {
      const { largeImageURL, webformatURL, tags, likes, views, comments, downloads } = value
      return `<div class="photo-card">
        <a href="${largeImageURL}">
      <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </a>
        <div class="info">
        <p class="info-item">
          <b>Likes</b>${likes}
        </p>
        <p class="info-item">
          <b>Views</b>${views}
        </p>
        <p class="info-item">
          <b>Comments</b>${comments}
        </p>
        <p class="info-item">
          <b>Downloads</b>${downloads}
        </p>
      </div>
      
    </div>`})
      .join("");
    refs.divGallery.innerHTML = markup;
  }
  let gallery = new SimpleLightbox('.photo-card a', {
    captionsData: "alt",
    captionDelay: 250
  });
}







// window.addEventListener('scroll', () => {
//     // console.log(scrollHeight) высота всего документа
//     // scrollTop скродд от верха в пикселях
//     // clientHeight высота вьюпорта

//     scrollHeight - clientHeight === scrollTop

//     scrollHeight - scrollTop === clientHeight

// }