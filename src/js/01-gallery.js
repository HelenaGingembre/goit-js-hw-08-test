// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


console.log(galleryItems);

//1.Создание и рендер разметки по массиву данных galleryItems 
const galleryContainer = document.querySelector('.gallery');

function createGalleryTemplate(galleryItem, index) {

        const template = `<div class="gallery__item">
        <a class="gallery__link" href="${galleryItem.original}">
            <img
            class="gallery__image"
            src="${galleryItem.preview}"
            data-source="${galleryItem.original}"
            alt="${galleryItem.description}"
            />
        </a>
        </div>`

    return template;
} 

function renderAllGallery() {
    const fullTemplate =  galleryItems.reduce((acc, galleryItem, index) => `${acc} ${createGalleryTemplate(galleryItem, index)}`, '')
    galleryContainer.insertAdjacentHTML('beforeend', fullTemplate)
}

renderAllGallery();

//2.Реализация делегирования на div.gallery 
//4. Открытие модального окна по клику на элементе галереи. 
galleryContainer.addEventListener("click", onOpenModal);

function onOpenModal(event) {
    
    // Запрети перенаправление на другую страницу по умолчанию.
    event.preventDefault();
    //console.log(event.target.nodeName);
    if (event.target.nodeName !== "IMG") {
        console.log('Its not IMG');
        return;
    }
    //2.2 и получение url большого изображения.
    const imgOriginalUrl = event.target.dataset.source;
    const description = event.target.alt;
    // console.log(`ImgOriginalUrl: ${imgOriginalUrl}`);
    
    //5. Замена значения атрибута src элемента <img> в модальном окне перед открытием.
    const instance = basicLightbox.create(`
        <img src="${imgOriginalUrl}"alt="${description}" />`);
    instance.show();

    //6.ДОП + Добавь закрытие модального окна по нажатию клавиши Escape. 
    //Сделай так, чтобы прослушивание клавиатуры было только пока открыто модальное окно.
    //У библиотеки basicLightbox есть метод для программного закрытия модального окна.
    window.addEventListener('keydown', onEscapeClick);
    function onEscapeClick(event) {
        // console.log(`event.code ==`, event.code);
        if (event.code == 'Escape') {
            instance.close();
            // видалення слухачпод
            window.removeEventListener('keydown', onEscapeClick);
        }
    }
   
}