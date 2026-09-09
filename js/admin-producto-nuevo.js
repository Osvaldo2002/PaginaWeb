document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-nuevo-producto");
    const inputImagen = document.getElementById("imagenProducto");
    const previewImg = document.getElementById("preview-imagen");
    const contenedorPreview = document.getElementById("contenedor-preview");

    // Imagen por defecto si el usuario no sube ninguna
    let imagenRuta = "img/placeholder.webp";

    // Escuchar cambios en la imagen para generar la vista previa
    inputImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagenRuta = event.target.result;
                previewImg.src = imagenRuta;
                contenedorPreview.classList.remove("d-none");
                contenedorPreview.classList.add("d-flex");
            };
            reader.readAsDataURL(file);
        } else {
            contenedorPreview.classList.remove("d-flex");
            contenedorPreview.classList.add("d-none");
            imagenRuta = "img/placeholder.webp";
        }
    });

    // Guardar producto nuevo
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreProducto").value.trim();
        const precio = parseFloat(document.getElementById("precioProducto").value);
        const descripcion = document.getElementById("descripcionProducto").value.trim();

        // Obtener la lista actual de productos de localStorage
        const productos = JSON.parse(localStorage.getItem("dino_productos")) || [];

        // Generar nuevo ID (mayor ID actual + 1)
        const nuevoId = productos.length > 0 ? Math.max(...productos.map(p => p.id)) + 1 : 1;

        const nuevoProducto = {
            id: nuevoId,
            nombre: nombre,
            precio: precio,
            descripcion: descripcion,
            imagen: imagenRuta
        };

        productos.push(nuevoProducto);
        localStorage.setItem("dino_productos", JSON.stringify(productos));

        alert(`Producto "${nombre}" registrado correctamente.`);
        window.location.href = "admin-productos.html";
    });
});