// Предзагрузка изображений
function preloadImages() {
  document.querySelectorAll('.thumbnails img').forEach(thumb => {
    const img = new Image();
    img.src = thumb.dataset.full;
  });
}
preloadImages();

document.addEventListener('DOMContentLoaded', function() {
  // Конфигурация скорости анимаций
  const ANIMATION_SPEED = {
    fast: 200,
    instant: 100
  };

  // Функция переключения контента
  function toggleContent(element) {
    const serviceBlock = element.closest('.service-content');
    const mainImg = serviceBlock.querySelector('.main-img');
    const hiddenText = serviceBlock.querySelector('.hidden-description');
    const arrow = element.querySelector('.arrow');
    const thumbnails = serviceBlock.querySelector('.thumbnails');

    // Переключаем состояние
    const isExpanded = serviceBlock.classList.toggle('expanded');
    
    // Управляем расширением фото
    mainImg.classList.toggle('expanded', isExpanded);
    
    // Анимация текста
    hiddenText.style.transitionDuration = ANIMATION_SPEED.fast + 'ms';
    hiddenText.style.maxHeight = isExpanded ? hiddenText.scrollHeight + 'px' : '0';
    hiddenText.style.opacity = isExpanded ? '1' : '0';

    // Переключение миниатюр
    thumbnails.style.display = isExpanded ? 'flex' : 'none';
    thumbnails.style.opacity = isExpanded ? '1' : '0';

    // Обновляем стрелку
    arrow.textContent = isExpanded ? '▲' : '▼';
  }

  // Быстрое переключение фото
  function switchPhoto(thumb) {
    const mainImg = thumb.closest('.service-content').querySelector('.main-img');
    const serviceBlock = thumb.closest('.service-content');
    const isExpanded = serviceBlock.classList.contains('expanded');
    
    // Сохраняем текущий размер
    const wasExpanded = mainImg.classList.contains('expanded');
    
    // 1. Мгновенное исчезновение
    mainImg.style.opacity = '0';
    
    // 2. Минимальная задержка
    setTimeout(() => {
      mainImg.src = thumb.dataset.full;
      
      // 3. Восстанавливаем состояние после загрузки
      mainImg.onload = function() {
        if (isExpanded) mainImg.classList.add('expanded');
        mainImg.style.opacity = '1';
        
        // Обновляем активную миниатюру
        document.querySelectorAll('.thumbnails img').forEach(t => {
          t.classList.remove('active');
        });
        thumb.classList.add('active');
        
        void mainImg.offsetWidth; // Форсируем перерисовку
      };
    }, ANIMATION_SPEED.instant);
  }

  // Навешиваем обработчики
  document.querySelectorAll('.Service-titles').forEach(title => {
    title.addEventListener('click', function() {
      toggleContent(this);
    });
  });

  document.querySelectorAll('.thumbnails img').forEach(thumb => {
    thumb.addEventListener('click', function(e) {
      e.stopPropagation();
      switchPhoto(this);
    });
  });
});