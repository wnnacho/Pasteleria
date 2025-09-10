// Lista de productos predefinidos (corregida)
const productos = [
  { id: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000 },
  { id: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000 },
  { id: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000 },
  { id: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000 },
  { id: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000 },
  { id: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500 },
  { id: 'PSA001', categoria: 'Productos Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000 },
  { id: 'PSA002', categoria: 'Productos Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', precio: 47000 },
  { id: 'PT001', categoria: 'Pastelería Tradicional', nombre: 'Empanada de Manzana', precio: 3000 },
  { id: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000 },
  { id: 'PG001', categoria: 'Productos Sin Gluten', nombre: 'Brownie Sin Gluten', precio: 4000 },
  { id: 'PG002', categoria: 'Productos Sin Gluten', nombre: 'Pan Sin Gluten', precio: 3500 },
  { id: 'PV001', categoria: 'Producto Vegano', nombre: 'Torta Vegana de Chocolate', precio: 50000 },
  { id: 'PV002', categoria: 'Producto Vegano', nombre: 'Galletas Veganas de Avena', precio: 4500 },
  { id: 'TE001', categoria: 'Torta Especial', nombre: 'Torta Especial de Cumpleaños', precio: 55000 },
  { id: 'TE002', categoria: 'Torta Especial', nombre: 'Torta Especial de Boda', precio: 60000 }
];

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function inicializarCarrito() {
  crearSelectorCategorias();
  mostrarProductos();
  mostrarCarrito();
}

// Crear selector de categorías
function crearSelectorCategorias() {
  const productList = document.getElementById('product-list');
  if (!productList) return;
  
  // Obtener categorías únicas
  const categorias = ['Todos', ...new Set(productos.map(producto => producto.categoria))];
  
  // Crear selector
  const selectorDiv = document.createElement('div');
  selectorDiv.style.marginBottom = '2rem';
  selectorDiv.style.textAlign = 'center';
  
  selectorDiv.innerHTML = `
    <label for="categoria-select" style="margin-right: 1rem;">Filtrar por categoría:</label>
    <select id="categoria-select" onchange="filtrarProductos()" class="btn">
      ${categorias.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
    </select>
  `;
  
  // Insertar antes de los productos
  productList.parentNode.insertBefore(selectorDiv, productList);
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
  
  // Mostrar todos los productos sin agrupar por categoría
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
    
    productDiv.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p><strong>Categoría:</strong> ${producto.categoria}</p>
      <p><strong>Precio:</strong> $${producto.precio.toLocaleString('es-CL')}</p>
      <button onclick="agregarAlCarrito('${producto.id}')" class="btn">Agregar al carrito</button>
    `;
    
    productosGrid.appendChild(productDiv);
  });
  
  productList.appendChild(productosGrid);
  
  // Si no hay productos que mostrar
  if (productosMostrar.length === 0) {
    productList.innerHTML = '<p>No hay productos en esta categoría.</p>';
  }
}

// Resto de las funciones se mantienen igual...
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

// Función para mostrar notificación (si no existe)
function mostrarNotificacion(mensaje, tipo) {
  // Puedes implementar notificaciones toast aquí si lo deseas
  console.log(`${tipo}: ${mensaje}`);
}

// Función para toggle carrito (si no existe)
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