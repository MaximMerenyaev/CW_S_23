document.addEventListener("DOMContentLoaded", function() {
    const gallery = document.getElementById("gallery");
    const lightbox = document.getElementById("lightbox");
    const fullImage = document.getElementById("full-image");
    const close = document.getElementById("close");
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    const paginationContainer = document.getElementById("pagination");
    const imagesPerPage = 16;
    let currentPage = 1;
    let currentIndex = 0;
    let images = [];
  
    // Генерация путей к изображениям с использованием шаблона
    const imageCount = 32; // Количество изображений
    const imagePathTemplate = "img/image{}.jpg"; // Шаблон пути к изображениям
  
    for (let i = 1; i <= imageCount; i++) {
      const imageUrl = imagePathTemplate.replace("{}", i);
      images.push(imageUrl);
    }
  
    // Отображение изображений на текущей странице
    function displayImages() {
      gallery.innerHTML = "";
      const startIndex = (currentPage - 1) * imagesPerPage;
      const endIndex = startIndex + imagesPerPage;
  
      for (let i = startIndex; i < endIndex && i < images.length; i++) {
        const imageUrl = images[i];
        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = "Image " + (i + 1);
        gallery.appendChild(img);
      }
    }
  
    // Открыть изображение во весь экран
    function openImage(index) {
      const image = gallery.children[index];
      fullImage.src = image.src;
      lightbox.classList.remove("hidden");
      document.body.classList.add("noscroll");
      currentIndex = index;
    }
  
    // Закрыть полноэкранный режим
    function closeImage() {
      lightbox.classList.add("hidden");
      document.body.classList.remove("noscroll");
    }
  
    // Переключение к предыдущему изображению
    function prevImage() {
      if (currentIndex > 0) {
        currentIndex--;
        const image = gallery.children[currentIndex];
        fullImage.src = image.src;
      }
    }
  
    // Переключение к следующему изображению
    function nextImage() {
      if (currentIndex < gallery.children.length - 1) {
        currentIndex++;
        const image = gallery.children[currentIndex];
        fullImage.src = image.src;
      }
    }
  
    // Обработчики событий для элементов галереи
    gallery.addEventListener("click", function(e) {
      if (e.target.tagName === "IMG") {
        const index = Array.from(gallery.children).indexOf(e.target);
        openImage(index);
      }
    });
  
    // Обработчики событий для элементов полноэкранного режима
    close.addEventListener("click", closeImage);
    prev.addEventListener("click", prevImage);
    next.addEventListener("click", nextImage);
  
    // Обработчики событий для пагинации
    function changePage(page) {
      if (page === currentPage) {
        return;
      }
  
      currentPage = page;
      displayImages();
      updatePagination();
    }
  
    function updatePagination() {
      paginationContainer.innerHTML = "";
  
      const pageCount = Math.ceil(images.length / imagesPerPage);
  
      for (let i = 1; i <= pageCount; i++) {
        const page = document.createElement("span");
        page.textContent = i;
        page.classList.add("page");
  
        if (i === currentPage) {
          page.classList.add("active");
        }
  
        page.addEventListener("click", function() {
          changePage(i);
        });
  
        paginationContainer.appendChild(page);
      }
    }
  
    displayImages();
    updatePagination();
  });
  