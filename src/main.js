document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const cards = document.querySelectorAll('.card');

  // Функция поиска
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();

    cards.forEach(card => {
      const cardText = card.querySelector('span').textContent.toLowerCase();
      if (cardText.includes(searchTerm)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });

  // Обработчик для кнопок "В корзину"
  const buttons = document.querySelectorAll('.card button');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.textContent === 'В корзину') {
        button.textContent = 'В корзине';
      } else {
        button.textContent = 'В корзину';
      }
    });
  });
});