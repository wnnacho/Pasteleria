// Lista de productos predefinidos
const productos = [
  { 
    id: 'TC001', 
    categoria: 'Tortas Cuadradas', 
    nombre: 'Torta Cuadrada de Chocolate', 
    precio: 45000, 
    imagen: '../img/tcchocolate.webp',
    descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.'
  },
  { 
    id: 'TC002', 
    categoria: 'Tortas Cuadradas', 
    nombre: 'Torta Cuadrada de Frutas', 
    precio: 50000, 
    imagen: '../img/tccfrutas.jpg',
    descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.'
  },
  { 
    id: 'TT001', 
    categoria: 'Tortas Circulares', 
    nombre: 'Torta Circular de Vainilla', 
    precio: 40000, 
    imagen: '../img/tcvainilla.jpg',
    descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión. '
  },
  { 
    id: 'TT002', 
    categoria: 'Tortas Circulares', 
    nombre: 'Torta Circular de Manjar', 
    precio: 42000, 
    imagen: '../img/tcmanjar.jpg',
    descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.'
  },
  { 
    id: 'PI001', 
    categoria: 'Postres Individuales', 
    nombre: 'Mousse de Chocolate', 
    precio: 5000, 
    imagen: '../img/mchocolate.jpg',
    descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.'
  },
  { 
    id: 'PI002', 
    categoria: 'Postres Individuales', 
    nombre: 'Tiramisú Clásico', 
    precio: 5500, 
    imagen: '../img/tiramisu.jpg',
    descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.'
  },
  { 
    id: 'PSA001', 
    categoria: 'Productos Sin Azúcar', 
    nombre: 'Torta Sin Azúcar de Naranja', 
    precio: 48000, 
    imagen: '../img/tsanaranja.webp',
    descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.'
  },
  { 
    id: 'PSA002', 
    categoria: 'Productos Sin Azúcar', 
    nombre: 'Cheesecake Sin Azúcar', 
    precio: 47000, 
    imagen: '../img/cheesecake.jpg',
    descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.'
  },
  { 
    id: 'PT001', 
    categoria: 'Pastelería Tradicional', 
    nombre: 'Empanada de Manzana', 
    precio: 3000, 
    imagen: '../img/emanzana.jpg',
    descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.'
  },
  { 
    id: 'PT002', 
    categoria: 'Pastelería Tradicional', 
    nombre: 'Tarta de Santiago', 
    precio: 6000, 
    imagen: '../img/tsantiago.jpg',
    descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.'
  },
  { 
    id: 'PG001', 
    categoria: 'Productos Sin Gluten', 
    nombre: 'Brownie Sin Gluten', 
    precio: 4000, 
    imagen: '../img/brownie.jpg',
    descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.'
  },
  { 
    id: 'PG002', 
    categoria: 'Productos Sin Gluten', 
    nombre: 'Pan Sin Gluten', 
    precio: 3500, 
    imagen: '../img/pan.jpg',
    descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.'
  },
  { 
    id: 'PV001', 
    categoria: 'Producto Vegano', 
    nombre: 'Torta Vegana de Chocolate', 
    precio: 50000, 
    imagen: '../img/tcvegana.jpeg',
    descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.'
  },
  { 
    id: 'PV002', 
    categoria: 'Producto Vegano', 
    nombre: 'Galletas Veganas de Avena', 
    precio: 4500, 
    imagen: '../img/galletas.jpg',
    descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.'
  },
  { 
    id: 'TE001', 
    categoria: 'Torta Especial', 
    nombre: 'Torta Especial de Cumpleaños', 
    precio: 55000, 
    imagen: '../img/tortacumple.jpg',
    descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.'
  },
  { 
    id: 'TE002', 
    categoria: 'Torta Especial', 
    nombre: 'Torta Especial de Boda', 
    precio: 60000, 
    imagen: '../img/tortaboda.jpeg',
    descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.'
  }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function inicializarCarrito() {
  crearSelectorCategorias();
  mostrarProductos();
  mostrarCarrito();
}

// Crear selector de categorías (solo uno)
function crearSelectorCategorias() {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  
  // Eliminar cualquier filtro existente duplicado
  const filtrosExistentes = document.querySelectorAll('#filtro-categorias');
  filtrosExistentes.forEach((filtro, index) => {
    if (index > 0) filtro.remove(); // Eliminar duplicados
  });
  
  // Obtener categorías únicas
  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];
  
  // Crear selector único
  const selectorDiv = document.createElement('div');
  selectorDiv.id = 'filtro-categorias';
  selectorDiv.style.marginBottom = '2rem';
  selectorDiv.style.textAlign = 'center';
  
  selectorDiv.innerHTML = `
    <label for="categoria-select" style="margin-right: 1rem;">Filtrar por categoría:</label>
    <select id="categoria-select" onchange="filtrarProductos()" class="btn">
      ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
    </select>
  `;
  
  // Insertar antes de los productos (solo si no existe)
  if (!document.getElementById('filtro-categorias')) {
    productList.parentNode.insertBefore(selectorDiv, productList);
  }
}

// Filtrar productos por categoría
function filtrarProductos() {
  const select = document.getElementById('categoria-select');
  const categoriaSeleccionada = select.value;
  
  if (categoriaSeleccionada === 'Todos') {
    mostrarProductos();
  } else {
    mostrarProductos(categoriaSeleccionada);
  }
}

// Mostrar productos (con filtro opcional)
function mostrarProductos(categoriaFiltro = null) {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  
  productList.innerHTML = '';
  
  // Filtrar productos si se especifica una categoría
  let productosMostrar = productos;
  if (categoriaFiltro && categoriaFiltro !== 'Todos') {
    productosMostrar = productos.filter(producto => producto.categoria === categoriaFiltro);
  }
  
  // Mostrar todos los productos
  const productosGrid = document.createElement('div');
  productosGrid.style.display = 'grid';
  productosGrid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
  productosGrid.style.gap = '1.5rem';
  
  productosMostrar.forEach(producto => {
    const productDiv = document.createElement('div');
    productDiv.style.background = 'white';
    productDiv.style.padding = '1rem';
    productDiv.style.borderRadius = '8px';
    productDiv.style.textAlign = 'center';
    productDiv.style.position = 'relative';
    
    // Espacio para imagen - puedes reemplazar la ruta con tus imágenes reales
    const imagenHTML = producto.imagen ? 
      `<img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem;">` : 
      '<div style="height: 150px; background: #f0f0f0; border-radius: 4px; margin-bottom: 1rem; display: flex; align-items: center; justify-content: center;">Imagen</div>';
    
    productDiv.innerHTML = `
      ${imagenHTML}
      <h3>${producto.nombre}</h3>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p><strong>Precio:</strong> $${producto.precio.toLocaleString('es-CL')}</p>
      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
        <button onclick="agregarAlCarrito('${producto.id}')" class="btn">Agregar al carrito</button>
        <button onclick="mostrarDetallesProducto('${producto.id}')" class="btn btn-secondary">Ver detalles</button>
      </div>
    `;
    
    productosGrid.appendChild(productDiv);
  });
  
  productList.appendChild(productosGrid);
  
  // Si no hay productos que mostrar
  if (productosMostrar.length === 0) {
    productList.innerHTML = '<p>No hay productos en esta categoría.</p>';
  }
}

// Función para mostrar detalles del producto
function mostrarDetallesProducto(id) {
  const producto = productos.find(p => p.id === id);
  if (!producto) return;
  
  // Crear modal de detalles
  const modal = document.createElement('div');
  modal.id = 'modal-detalles';
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  `;
  
  modal.innerHTML = `
    <div style="background: white; padding: 2rem; border-radius: 8px; max-width: 500px; width: 90%;">
      <h2 style="color: #884513; margin-bottom: 1rem;">${producto.nombre}</h2>
      ${producto.imagen ? `<img src="${producto.imagen}" alt="${producto.nombre}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 4px; margin-bottom: 1rem;">` : ''}
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p><strong>Precio:</strong> $${producto.precio.toLocaleString('es-CL')}</p>
      <p><strong>Descripción:</strong> ${producto.descripcion}</p>
      <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; gap: 1rem;">
        <button onclick="agregarAlCarrito('${producto.id}'); mostrarNotificacion('${producto.nombre} agregado al carrito', 'success');" class="btn">Agregar al carrito</button>
        <button onclick="cerrarModalDetalles()" class="btn btn-secondary">Cerrar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Cerrar modal al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModalDetalles();
    }
  });
  
  // Cerrar modal con la tecla Escape
  document.addEventListener('keydown', function teclaEscape(e) {
    if (e.key === 'Escape') {
      cerrarModalDetalles();
      document.removeEventListener('keydown', teclaEscape);
    }
  });
}

// Función para cerrar el modal de detalles
function cerrarModalDetalles() {
  const modal = document.getElementById('modal-detalles');
  if (modal) {
    modal.remove();
  }
}

function agregarAlCarrito(id) {
  const producto = productos.find(p => p.id === id);
  const item = carrito.find(i => i.id === id);

  if (item) {
      item.cantidad += 1;
  } else {
      carrito.push({ ...producto, cantidad: 1 });
  }

  guardarCarrito();
  mostrarCarrito();
  mostrarNotificacion(`${producto.nombre} agregado al carrito`, 'success');
}

function disminuirCantidad(id) {
  const item = carrito.find(i => i.id === id);
  if (item) {
      item.cantidad -= 1;
      if (item.cantidad <= 0) {
          carrito = carrito.filter(i => i.id !== id);
      }
      guardarCarrito();
      mostrarCarrito();
  }
}

function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

function vaciarCarrito() {
  if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
      mostrarNotificacion('Carrito vaciado', 'info');
  }
}

function guardarCarrito() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function mostrarCarrito() {
  const cartList = document.getElementById('cart-list');
  if (!cartList) return;

  cartList.innerHTML = '';

  if (carrito.length === 0) {
      cartList.innerHTML = '<p>El carrito está vacío.</p>';
      return;
  }

  carrito.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.style.marginBottom = '1rem';
      itemDiv.style.padding = '1rem';
      itemDiv.style.background = '#f8f8f8';
      itemDiv.style.borderRadius = '4px';
      
      itemDiv.innerHTML = `
          <strong>${item.nombre}</strong><br>
          Precio: $${item.precio.toLocaleString('es-CL')} x ${item.cantidad} = $${(item.precio * item.cantidad).toLocaleString('es-CL')}<br>
          <button onclick="agregarAlCarrito('${item.id}')" class="btn" style="padding: 0.25rem 0.5rem; margin: 0.25rem;">+</button>
          <button onclick="disminuirCantidad('${item.id}')" class="btn" style="padding: 0.25rem 0.5rem; margin: 0.25rem;">-</button>
          <button onclick="eliminarDelCarrito('${item.id}')" class="btn btn-secondary" style="padding: 0.25rem 0.5rem; margin: 0.25rem;">Eliminar</button>
      `;
      cartList.appendChild(itemDiv);
  });

  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  cartList.innerHTML += `<h3>Total: $${total.toLocaleString('es-CL')}</h3>`;
}

// Función de notificación mejorada
function mostrarNotificacion(mensaje, tipo = 'info') {
  const notification = document.createElement('div');
  notification.textContent = mensaje;
  notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 4px;
      color: white;
      z-index: 10000;
      font-weight: bold;
  `;
  
  if (tipo === 'error') {
      notification.style.backgroundColor = '#dc3545';
  } else if (tipo === 'success') {
      notification.style.backgroundColor = '#28a745';
  } else {
      notification.style.backgroundColor = '#884513';
  }
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
      notification.remove();
  }, 3000);
}

function toggleCarrito() {
  const divCarrito = document.getElementById('DivCarrito');
  if (divCarrito.style.display === 'none') {
    divCarrito.style.display = 'block';
  } else {
    divCarrito.style.display = 'none';
  }
}

// Inicializar carrito cuando se carga la página
document.addEventListener('DOMContentLoaded', inicializarCarrito);