const productosIniciales = [
    {
        id: 1,
        nombre: "Triceratops Adulto",
        precio: 590000,
        descripcion: "Un animal de tamaño grande, lleno de energía siempre.",
        imagen: "img/JWETriceratops.webp",
        linkDetalle: null
    },
    {
        id: 2,
        nombre: "Baryonyx (2 meses)",
        precio: 210000,
        descripcion: "Un dinosaurio semiacuático de tamaño mediano.",
        imagen: "img/Babyonyx.jpeg",
        linkDetalle: "baryonyx.html"
    },
    {
        id: 3,
        nombre: "Pelota para dinosaurios",
        precio: 9500,
        descripcion: "Una pelota súper resistente.",
        imagen: "img/TrikePelota2.jpeg",
        linkDetalle: null
    },
    {
        id: 4,
        nombre: "Hatzegopteryx (3 semanas)",
        precio: 250000,
        descripcion: "Un reptil volador de gran tamaño.",
        imagen: "img/Gemini_Generated_Image_dxhn9hdxhn9hdxhn.jpeg",
        linkDetalle: null
    },
    {
        id: 5,
        nombre: "Hatzegopteryx Blue (3 semanas)",
        precio: 390000,
        descripcion: "Un reptil volador de gran tamaño y colorido.",
        imagen: "img/babyteryxazul.jpeg",
        linkDetalle: null
    },
    {
        id: 6,
        nombre: "Triceratops Leopard (2 - 3 meses)",
        precio: 300000,
        descripcion: "Un animal de tamaño grande.",
        imagen: "img/babytrike.jpeg",
        linkDetalle: null
    },
    {
        id: 7,
        nombre: "Hatzegopteryx (Adulto)",
        precio: 800000,
        descripcion: "Un animal de tamaño grande.",
        imagen: "img/hatzeAdulto.jpeg",
        linkDetalle: null
    },
    {
        id: 8,
        nombre: "Argentavis (Adulto)",
        precio: 700000,
        descripcion: "Un animal de tamaño grande.",
        imagen: "img/Argentavis.jpeg",
        linkDetalle: null
    }
];

function obtenerProductos() {
    const productosGuardados = localStorage.getItem("dino_productos");
    if (!productosGuardados) {
        localStorage.setItem("dino_productos", JSON.stringify(productosIniciales));
        return productosIniciales;
    }
    return JSON.parse(productosGuardados);
}

function formatearPrecio(precio) {
    return "$" + Number(precio).toLocaleString("es-CL");
}

function renderizarProductos() {
    const productos = obtenerProductos();
    const contenedor = document.getElementById("contenedor-productos");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    if (productos.length === 0) {
        contenedor.innerHTML = `<div class="col-12 text-center py-5"><p class="fs-5 text-muted">No hay productos disponibles por el momento.</p></div>`;
        return;
    }

    productos.forEach(prod => {
        const enlaceDetalle = prod.linkDetalle ? prod.linkDetalle : "#";
        const textoBoton = prod.linkDetalle ? "Ver Detalle" : "Comprar";

        const col = document.createElement("div");
        col.className = "col-sm-3 mb-4";

        col.innerHTML = `
            <div class="card h-100" style="width: 100%;">
                <a href="${enlaceDetalle}">
                    <img src="${prod.imagen}" class="card-img-top imagen-tarjeta" alt="${prod.nombre}" onerror="this.src='https://via.placeholder.com/300x200?text=Sin+Imagen'">
                </a>
                <div class="card-body d-flex flex-column justify-content-between">
                    <div>
                        <h5 class="card-title">
                            <a href="${enlaceDetalle}" class="text-decoration-none text-dark">${prod.nombre}</a>
                        </h5>
                        <h6>${formatearPrecio(prod.precio)}</h6>
                        <p class="card-text">${prod.descripcion}</p>
                    </div>
                    <a href="${enlaceDetalle}" class="btn btn-primary mt-3">${textoBoton}</a>
                </div>
            </div>
        `;

        contenedor.appendChild(col);
    });
}

document.addEventListener("DOMContentLoaded", renderizarProductos);