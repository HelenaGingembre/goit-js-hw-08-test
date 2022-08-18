// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';


console.log(galleryItems);

//1.Создание и рендер разметки по массиву данных galleryItems 
const galleryContainer = document.querySelector('.gallery');

function createGalleryTemplate(galleryItem, index) {
    const { preview, original, description } = galleryItem;
      return `<div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </div>`

    
} 

function renderAllGallery() {
    const fullTemplate =  galleryItems.reduce((acc, galleryItem, index) => `${acc} ${createGalleryTemplate(galleryItem, index)}`, '')
    galleryContainer.insertAdjacentHTML('beforeend', fullTemplate)
}

renderAllGallery();

//4. Открытие модального окна по клику на элементе галереи. 
const lightbox = new SimpleLightbox('.gallery a', {
  captionDelay: 250,
  captionsData: 'alt',
});
galleryContainer.addEventListener("click", lightbox);
