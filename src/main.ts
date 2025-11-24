import { type TProduct } from './types';

const hoodies: TProduct[] = [
  { id: '999-p-100-r', name: 'Худи с принтом', originalPrice: '1299 ₽', price: '999 ₽' },
  { id: '1199-p', name: 'Худи с узором', originalPrice: null, price: '1199 ₽' },
  { id: '1099-p-50-r', name: 'Худи классическое', originalPrice: '1399 ₽', price: '1099 ₽' },
  { id: '1299-p', name: 'Худи oversize', originalPrice: null, price: '1299 ₽' },
];

const shorts: TProduct[] = [
  { id: '999-p-100-r', name: 'Шорты с принтом', originalPrice: '1199 ₽', price: '999 ₽' },
  { id: '1199-p', name: 'Шорты спортивные', originalPrice: null, price: '1199 ₽' },
  { id: '899-p', name: 'Шорты укороченные', originalPrice: '1099 ₽', price: '899 ₽' },
  { id: '1099-p-30-r', name: 'Шорты классика', originalPrice: null, price: '1099 ₽' },
];

const cart: Set<string> = new Set();
const likes: Set<string> = new Set();

// ... остальной код без изменений (функции renderCards, filterCards, обработчики событий)

function renderCards(category: string, data: TProduct[]): void {
  const container = document.getElementById(category);
  if (!container) return;

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('div');
    image.className = 'image';
    card.appendChild(image);

    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.setAttribute('data-id', item.id);
    likeBtn.textContent = likes.has(item.id) ? '❤️' : '🤍';
    card.appendChild(likeBtn);

    const prices = document.createElement('div');
    prices.className = 'prices';
    if (item.originalPrice) {
      const originalPrice = document.createElement('span');
      originalPrice.className = 'original-price';
      originalPrice.textContent = item.originalPrice;
      prices.appendChild(originalPrice);
    }
    const currentPrice = document.createElement('span');
    currentPrice.className = 'current-price';
    currentPrice.textContent = item.price;
    prices.appendChild(currentPrice);
    card.appendChild(prices);

    const name = document.createElement('div');
    name.className = 'name';
    name.textContent = item.name;
    card.appendChild(name);

    const addToCartBtn = document.createElement('button');
    addToCartBtn.className = 'add-to-cart ' + (cart.has(item.id) ? 'in-cart' : '');
    addToCartBtn.setAttribute('data-id', item.id);
    addToCartBtn.textContent = cart.has(item.id) ? 'В корзине' : 'В корзину';
    card.appendChild(addToCartBtn);

    container.appendChild(card);
  });
}

function filterCards(searchTerm: string): void {
  const filteredHoodies = searchTerm ? hoodies.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : hoodies;
  
  const filteredShorts = searchTerm ? shorts.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) : shorts;
  
  renderCards('hoodiesCards', filteredHoodies);
  renderCards('shortsCards', filteredShorts);
}

function handleSearchInput(e: Event): void {
  const target = e.target as HTMLInputElement;
  const searchTerm = target.value.trim();
  filterCards(searchTerm);
}

function handleClick(e: Event): void {
  const target = e.target as HTMLElement;
  const button = target.closest('button');
  if (!button) return;

  const itemId = button.getAttribute('data-id');
  if (!itemId) return;

  if (button.classList.contains('add-to-cart')) {
    if (cart.has(itemId)) {
      cart.delete(itemId);
    } else {
      cart.add(itemId);
    }
    // Перерисовываем все карточки для обновления состояния кнопок
    const searchInput = document.getElementById('searchInput') as HTMLInputElement;
    const searchInputMobile = document.getElementById('searchInputMobile') as HTMLInputElement;
    const searchTerm = searchInput?.value.trim() || searchInputMobile?.value.trim() || '';
    filterCards(searchTerm);
    
  } else if (button.classList.contains('like-btn')) {
    if (likes.has(itemId)) {
      likes.delete(itemId);
      button.textContent = '🤍';
    } else {
      likes.add(itemId);
      button.textContent = '❤️';
    }
  }
}

// Инициализация
renderCards('hoodiesCards', hoodies);
renderCards('shortsCards', shorts);

// Обработчики событий
document.getElementById('searchInput')?.addEventListener('input', handleSearchInput);
document.getElementById('searchInputMobile')?.addEventListener('input', handleSearchInput);
document.addEventListener('click', handleClick);