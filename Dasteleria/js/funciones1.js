// Funciones generales para todo el sitio
document.addEventListener('DOMContentLoaded', function() {
    // Marcar la página activa en la navegación
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Inicializar carrito si existe
    if (typeof inicializarCarrito === 'function') {
        inicializarCarrito();
    }
});

// Función para mostrar notificaciones
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

// Validación básica de formularios
function validarFormulario(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc3545';
            isValid = false;
            mostrarNotificacion(`El campo ${input.name} es requerido`, 'error');
        } else {
            input.style.borderColor = '';
            
            // Validación específica para email
            if (input.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    input.style.borderColor = '#dc3545';
                    isValid = false;
                    mostrarNotificacion('Por favor ingresa un email válido', 'error');
                }
            }
            
            // Validación para contraseñas (mínimo 6 caracteres)
            if (input.type === 'password' && input.value.length < 6) {
                input.style.borderColor = '#dc3545';
                isValid = false;
                mostrarNotificacion('La contraseña debe tener al menos 6 caracteres', 'error');
            }
        }
    });
    
    return isValid;
}

// Función para alternar visibilidad del carrito
function toggleCarrito() {
    const carritoDiv = document.getElementById('DivCarrito');
    if (carritoDiv) {
        if (carritoDiv.style.display === 'none' || !carritoDiv.style.display) {
            carritoDiv.style.display = 'block';
        } else {
            carritoDiv.style.display = 'none';
        }
    }
}