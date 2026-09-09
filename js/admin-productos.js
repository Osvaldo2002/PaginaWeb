// Lista inicial con los 8 productos sincronizados
const productosIniciales = [
    {
        id: 1,
        nombre: "Triceratops Adulto",
        precio: 590000,
        descripcion: "Un animal de tamaño grande, lleno de energía siempre.",
        imagen: "img/JWETriceratops.webp"
    },
    {
        id: 2,
        nombre: "Baryonyx (2 meses)",
        precio: 210000,
        descripcion: "Un dinosaurio semiacuático de tamaño mediano.",
        imagen: "img/Babyonyx.jpeg"
    },
    {
        id: 3,
        nombre: "Pelota para dinosaurios",
        precio: 9500,
        descripcion: "Una pelota súper resistente.",
        imagen: "img/TrikePelota2.jpeg"
    },
    {
        id: 4,
        nombre: "Hatzegopteryx (3 semanas)",
        precio: 250000,
        descripcion: "Un reptil volador de gran tamaño.",
        imagen: "img/Gemini_Generated_Image_dxhn9hdxhn9hdxhn.jpeg"
    },
    {
        id: 5,
        nombre: "Hatzegopteryx Blue (3 semanas)",
        precio: 390000,
        descripcion: "Un reptil volador de gran tamaño y colorido.",
        imagen: "img/babyteryxazul.jpeg"
    },
    {
        id: 6,
        nombre: "Triceratops Leopard (2 - 3 meses)",
        precio: 300000,
        descripcion: "Un animal de tamaño grande.",
        imagen: "img/babytrike.jpeg"
    },
    {
        id: 7,
        nombre: "Hatzegopteryx (Adulto)",
        precio: 800000,
        descripcion: "Un animal de tamaño grande.",
        imagen: "img/hatzeAdulto.jpeg"
    },
    {
        id: 8,
        nombre: "Argentavis (Adulto)",
        precio: 700000,
        descripcion: "Un animal de tamaño grande.",
        imagen: "img/Argentavis.jpeg"
    }
];

// Obtener o inicializar productos en localStorage
function obtenerProductos() {
    const productosGuardados = localStorage.getItem("dino_productos");
    if (!productosGuardados) {
        localStorage.setItem("dino_productos", JSON.stringify(productosIniciales));
        return productosIniciales;
    }
    return JSON.parse(productosGuardados);
}

// Formatear precio ($ CLP)
function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

// Renderizar la tabla de productos
function renderizarTabla() {
    const productos = obtenerProductos();
    const tbody = document.getElementById("tabla-productos-body");
    tbody.innerHTML = "";

    if (productos.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-4 text-muted">No hay productos registrados.</td>
            </tr>`;
        return;
    }

    productos.forEach(producto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${producto.id}</td>
            <td>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: 50px; object-fit: cover;" class="rounded" onerror="this.src='https://via.placeholder.com/50?text=Sin+Imagen'">
            </td>
            <td class="fw-semibold">${producto.nombre}</td>
            <td>${formatearPrecio(producto.precio)}</td>
            <td>${producto.descripcion}</td>
            <td class="text-center">
                <a href="admin-producto-editar.html?id=${producto.id}" class="btn btn-sm btn-outline-success me-1">Editar</a>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarProducto(${producto.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Función para eliminar producto por ID
function eliminarProducto(id) {
    const productos = obtenerProductos();
    // Buscamos el producto garantizando la conversión a número
    const productoAEliminar = productos.find(p => Number(p.id) === Number(id));

    if (!productoAEliminar) return;

    if (confirm(`¿Estás seguro de que deseas eliminar "${productoAEliminar.nombre}" (ID: ${id})?`)) {
        // Filtrar asegurando comparación numérica
        const productosFiltrados = productos.filter(prod => Number(prod.id) !== Number(id));
        localStorage.setItem("dino_productos", JSON.stringify(productosFiltrados));
        renderizarTabla();
    }
}

document.addEventListener("DOMContentLoaded", renderizarTabla);