function togglecarrito() {
    var x = document.getElementById("DivCarrito");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

  // Lista de productos predefinidos
const productos = [
    { id: TC001,categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Chocolate", precio: 45000 },
    { id: TC002,categoria: "Tortas Cuadradas", nombre: "Torta Cuadrada de Frutas", precio: 50000 },
    { id: TT001,categoria: "Tortas Circulares", nombre: "Torta Circular de Vainilla", precio: 40000 },
    { id: TT002,categoria: "Tortas Circulares", nombre: "Torta Circular de manjar", precio: 42000 },
    { id: PI001,categoria: "Postres Individuales", nombre: "Mousse de chocolate", precio: 5000 },
    { id: PI002,categoria: "Postres Individuales", nombre: "Tiramisu clasico", precio: 5500 },
    { id: PSA001,categoria: "Productos Sin Azucar", nombre: "Torta Sin Azucar de Naranja", precio: 48000 },
    { id: PSA002,categoria: "Productos Sin Azucar", nombre: "Cheesecake Sin Azucar", precio: 47000 },
    { id: PT001,categoria: "Pasteleria Tradicional", nombre: "Empanada de Manzana", precio: 3000 },
    { id: PT002,categoria: "Pasteleria Tradicional", nombre: "Tarta de Santiago", precio: 6000 },
    { id: PG001,categoria: "Productos Sin Gluten", nombre: "Brownie Sin Gluten", precio: 4000 },
    { id: PG002,categoria: "Productos Sin Gluten", nombre: "Pan Sin Gluten", precio: 3500 },
    { id: PV001,categoria: "Producto Vegano", nombre: "Torta Vegana de Chocolate", precio: 50000 },
    { id: PV002,categoria: "Producto Vegano", nombre: "Galletas Veganas de Avena", precio: 4500 },
    { id: TE001,categoria: "Torta Especial", nombre: "Torta Especial de Cumpleaños", precio: 55000 },
    { id: TE002,categoria: "Torta Especial", nombre: "Torta Especial de Boda", precio: 60000 }
  ];
    
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    
    // Mostrar productos
    function mostrarProductos() {
      productList.innerHTML = '';
      productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
          <strong>${producto.nombre}</strong><br>
          Precio: $${producto.precio}<br>
          <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productList.appendChild(div);
      });
    }
    
    // Agregar al carrito
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
    }
    
    // Disminuir cantidad
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
    
    // Eliminar del carrito
    function eliminarDelCarrito(id) {
      carrito = carrito.filter(item => item.id !== id);
      guardarCarrito();
      mostrarCarrito();
    }
    
    // Vaciar carrito completamente
    function vaciarCarrito() {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
    }
    
    // Guardar en localStorage
    function guardarCarrito() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
    
    // Mostrar carrito
    function mostrarCarrito() {
      cartList.innerHTML = '';
    
      if (carrito.length === 0) {
        cartList.innerHTML = '<p>El carrito está vacío.</p>';
        return;
      }
    
      carrito.forEach(item => {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <strong>${item.nombre}</strong><br>
          Precio: $${item.precio} x ${item.cantidad} = $${item.precio * item.cantidad}<br>
          <button onclick="agregarAlCarrito(${item.id})">+</button>
          <button onclick="disminuirCantidad(${item.id})">-</button>
          <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>
        `;
        cartList.appendChild(div);
      });
    
      const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
      cartList.innerHTML += `<h3>Total: $${total}</h3>`;
    }
    
    // Inicializar
    mostrarProductos();
    mostrarCarrito();
    