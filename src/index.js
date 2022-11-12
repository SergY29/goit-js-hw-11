import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import Notiflix from 'notiflix';
import { fetchPictures, resetPage } from "./fetchPictures";

const refs = {
  form: document.querySelector('#search-form'),
  divGallery: document.querySelector('.gallery'),
  buttonLoadMore: document.querySelector('.load-more'),
};

refs.buttonLoadMore.style.display = "none";

refs.form.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onloadMore);


function onSearch(e) {
  e.preventDefault();
  refs.divGallery.innerHTML = '';
  resetPage();
  fetchPictures.searchQuery = e.currentTarget.elements.searchQuery.value;
  fetchPictures(fetchPictures.searchQuery)
    .then(createMarkup);


};

function onloadMore() {
  refs.buttonLoadMore.style.display = "none";
  fetchPictures(fetchPictures.searchQuery)
    .then(createMarkup);
};

function createMarkup(data) {
  if (data.hits.length === 0) {
    Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
    return
  } else {
    const markup = data.hits.map((value) => {
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
    refs.divGallery.insertAdjacentHTML("beforeend", markup);
    refs.buttonLoadMore.style.display = "block";

    let gallery = new SimpleLightbox('.photo-card a', {
      captionsData: "alt",
      captionDelay: 250
    });

  }
}



// const { scrollHeight, clientHeight, scrollTop
// } = document.documentElement
// if (scrollHeight - clientHeight === scrollTop) {
  // console.log(scrollHeight) высота всего документа
  // scrollTop скролл от верха в пикселях
  // clientHeight высота вьюпорта




