const closeButton = document.querySelector(".lightbox-close");
const lightBox = document.querySelector(".lightbox")
const galleryItems = document.querySelectorAll(".gallery-item")
const lightboxImage = document.querySelector(".lightbox-image");


function showImage(event){
    // show lightbox
    lightBox.classList.remove("hidden")

    // get current galleryItem
    const elementClickedOn = event.target;
    const galleryItemParent = elementClickedOn.parentElement;

    // replace content of lightbox image with current image and caption
    lightboxImage.innerHTML = galleryItemParent.innerHTML
}


function hideImage(event){
    event.preventDefault();
    lightBox.classList.add("hidden");
}


closeButton.onclick = hideImage;


for(let i=0; i<galleryItems.length; i++){
    const item = galleryItems[i];
    item.onclick = showImage;
}










