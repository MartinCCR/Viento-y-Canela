// número de WhatsApp de Viento y Canela (con el 57 de Colombia adelante)
const PHONE_NUMBER = "570000000000"; 

// Lista completa de tortas de Viento y Canela
const tortas = [
  {
    id: 1,
    nombre: "Torta de Naranja y Amapola",
    categoria: "Frutales",
    descripcion: "Esponjosa masa artesanal infusionada con naranja natural y semillas de amapola.",
    imagenes: [
      "img/torta-naranja-amapola-pers.jpeg",
      "img/torta-amapola-pers.jpeg"
    ],
    precios: {
      "1/4 lb": 22000,
      "1/2 lb": 38000,
      "1 lb": 68000,
      "1.5 lb": 98000,
      "1 kg": 128000
    }
  },
  {
    id: 2,
    nombre: "Torta de Naranja Natural",
    categoria: "Frutales",
    descripcion: "Elaborada con jugo y ralladura de naranja fresca, suave, húmeda y decorada con delicadeza.",
    imagenes: [
      "img/torta-naranja-pers.jpeg"
    ],
    precios: {
      "1/4 lb": 20000,
      "1/2 lb": 35000,
      "1 lb": 65000,
      "1.5 lb": 92000,
      "1 kg": 120000
    }
  },
  {
    id: 3,
    nombre: "Torta Red Velvet",
    categoria: "Especiales",
    descripcion: "Clásica masa aterciopelada con suave crema. Disponible en presentación tradicional o forma de corazón.",
    imagenes: [
      "img/torta-redvelvet.jpeg",
      "img/torta-redvelvet-corazon.jpeg"
    ],
    precios: {
      "1/4 lb": 25000,
      "1/2 lb": 42000,
      "1 lb": 75000,
      "1.5 lb": 110000,
      "1 kg": 140000
    }
  },
  {
    id: 4,
    nombre: "Torta de Chocolate Especial",
    categoria: "Especiales",
    descripcion: "Masa húmeda de puro chocolate con cobertura suave y opción de decoración personalizada con flores.",
    imagenes: [
      "img/torta-chocolate-pers.jpeg"
    ],
    precios: {
      "1/4 lb": 24000,
      "1/2 lb": 40000,
      "1 lb": 72000,
      "1.5 lb": 105000,
      "1 kg": 135000
    }
  },
  {
    id: 5,
    nombre: "Torta Natural de Manzana",
    categoria: "Frutales",
    descripcion: "Horneada con finas láminas de manzana real caramelizada y un toque de canela casera.",
    imagenes: [
      "img/torta-manzana.jpeg"
    ],
    precios: {
      "1/4 lb": 22000,
      "1/2 lb": 38000,
      "1 lb": 68000,
      "1.5 lb": 98000,
      "1 kg": 128000
    }
  },
  {
    id: 6,
    nombre: "Torta de Banano Casera",
    categoria: "Frutales",
    descripcion: "Receta tradicional con banano maduro seleccionado, masa doradita y ultra suave.",
    imagenes: [
      "img/torta-banano.jpeg"
    ],
    precios: {
      "1/4 lb": 18000,
      "1/2 lb": 32000,
      "1 lb": 58000,
      "1.5 lb": 85000,
      "1 kg": 110000
    }
  },
  {
    id: 7,
    nombre: "Torta Natural de Vainilla",
    categoria: "Tradicionales",
    descripcion: "Sabor clásico de la casa. Opción sencilla artesanal o personalizada para eventos especiales.",
    imagenes: [
      "img/torta-natural-vainilla.jpeg",
      "img/torta-natural-vainilla-pers.jpeg",
      "img/torta-natural-vainilla-cuadrada.jpeg"
    ],
    precios: {
      "1/4 lb": 18000,
      "1/2 lb": 32000,
      "1 lb": 58000,
      "1.5 lb": 85000,
      "1 kg": 110000
    }
  }
];

// Guardar índice de la foto actual para el carrusel de cada tarjeta
const activeImageIndices = {};

// Función para formatear los números en pesos colombianos (COP)
const formatCOP = (num) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(num);
};

// Genera el enlace de WhatsApp limpio y directo con la torta y tamaño seleccionados
function generateWSLink(nombreTorta, tamano, precio) {
  const message = `Hola Viento y Canela! 🍰 Me interesa encargar la *${nombreTorta}* en tamaño *${tamano}* (Precio estimado: ${formatCOP(precio)}). ¿Tienen disponibilidad?`;
  return `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Renderiza todas las tarjetas de tortas en la página web
function renderProducts(items) {
  const container = document.getElementById('productContainer');
  if (!container) return;
  
  container.innerHTML = '';

  if (items.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No se encontraron tortas con ese criterio.</p>`;
    return;
  }

  items.forEach(torta => {
    if (activeImageIndices[torta.id] === undefined) {
      activeImageIndices[torta.id] = 0;
    }

    const currentImgIndex = activeImageIndices[torta.id];
    const currentImgUrl = torta.imagenes[currentImgIndex] || torta.imagenes[0];
    const defaultSize = "1/2 lb";
    const defaultPrice = torta.precios[defaultSize];

    const card = document.createElement('div');
    card.className = 'product-card';

    const showCarouselControls = torta.imagenes.length > 1;
    const carouselHTML = `
      <div class="image-carousel">
        <img src="${currentImgUrl}" alt="${torta.nombre}">
        ${showCarouselControls ? `
          <button class="carousel-btn prev" onclick="changeImage(${torta.id}, -1)">&#10094;</button>
          <button class="carousel-btn next" onclick="changeImage(${torta.id}, 1)">&#10095;</button>
          <span class="img-counter">${currentImgIndex + 1}/${torta.imagenes.length}</span>
        ` : ''}
      </div>
    `;

    card.innerHTML = `
      ${carouselHTML}
      <div class="product-info">
        <h3 class="product-title">${torta.nombre}</h3>
        <p class="product-desc">${torta.descripcion}</p>
        
        <div class="size-selector">
          <label for="size-${torta.id}">Seleccionar Tamaño:</label>
          <select id="size-${torta.id}" onchange="updatePrice(${torta.id})">
            ${Object.keys(torta.precios).map(size => `
              <option value="${size}" ${size === defaultSize ? 'selected' : ''}>${size}</option>
            `).join('')}
          </select>
        </div>

        <div class="price-container">
          <span class="price-label">Precio estimado:</span>
          <span class="price-amount" id="price-${torta.id}">${formatCOP(defaultPrice)}</span>
        </div>

        <a id="btn-ws-${torta.id}" 
           href="${generateWSLink(torta.nombre, defaultSize, defaultPrice)}" 
           target="_blank" 
           class="btn-card-ws">
           Pedir por WhatsApp
        </a>
      </div>
    `;

    container.appendChild(card);
  });
}

// Función para cambiar de foto cuando la torta tiene varias imágenes (carrusel)
function changeImage(tortaId, direction) {
  const torta = tortas.find(t => t.id === tortaId);
  if (!torta) return;

  let currentIndex = activeImageIndices[tortaId] || 0;
  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = torta.imagenes.length - 1;
  } else if (currentIndex >= torta.imagenes.length) {
    currentIndex = 0;
  }

  activeImageIndices[tortaId] = currentIndex;

  const btnElement = document.getElementById(`btn-ws-${tortaId}`);
  if (!btnElement) return;
  
  const cardElement = btnElement.closest('.product-card');
  const imgElement = cardElement.querySelector('.image-carousel img');
  const counterElement = cardElement.querySelector('.img-counter');
  
  if (imgElement) imgElement.src = torta.imagenes[currentIndex];
  if (counterElement) counterElement.textContent = `${currentIndex + 1}/${torta.imagenes.length}`;
}

// Actualiza el precio en pantalla y el enlace de WhatsApp cuando cambian el tamaño en el menú desplegable
function updatePrice(tortaId) {
  const torta = tortas.find(t => t.id === tortaId);
  const sizeSelect = document.getElementById(`size-${tortaId}`);
  const priceDisplay = document.getElementById(`price-${tortaId}`);
  const wsBtn = document.getElementById(`btn-ws-${tortaId}`);

  if (!sizeSelect || !priceDisplay || !wsBtn) return;

  const selectedSize = sizeSelect.value;
  const newPrice = torta.precios[selectedSize];

  priceDisplay.textContent = formatCOP(newPrice);
  wsBtn.href = generateWSLink(torta.nombre, selectedSize, newPrice);
}

// Filtra las tortas según lo que escriban en la barra de búsqueda o elijan en las categorías
function filterProducts() {
  const searchInput = document.getElementById('searchInput');
  const activeCatBtn = document.querySelector('.cat-btn.active');
  
  const searchText = searchInput ? searchInput.value.toLowerCase() : "";
  const activeCategory = activeCatBtn ? activeCatBtn.dataset.cat : "todas";

  return tortas.filter(torta => {
    const matchesSearch = torta.nombre.toLowerCase().includes(searchText) || torta.descripcion.toLowerCase().includes(searchText);
    const matchesCategory = activeCategory === 'todas' || torta.categoria === activeCategory;
    return matchesSearch && matchesCategory;
  });
}

// Inicialización de eventos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  renderProducts(tortas);

  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderProducts(filterProducts());
    });
  }

  const catButtons = document.querySelectorAll('.cat-btn');
  catButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      catButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderProducts(filterProducts());
    });
  });

  const mobileMenuBtn = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});