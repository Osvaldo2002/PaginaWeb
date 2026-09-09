document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productoId = parseInt(urlParams.get("id"));

    const productos = JSON.parse(localStorage.getItem("dino_productos")) || [];
    const producto = productos.find(p => p.id === productoId);

    if (!producto) {
        alert("Producto no encontrado.");
        window.location.href = "admin-productos.html";
        return;
    }

    // Cargar los valores en los inputs del formulario
    document.getElementById("idProducto").value = producto.id;
    document.getElementById("nombreProducto").value = producto.nombre;
    document.getElementById("precioProducto").value = producto.precio;
    document.getElementById("descripcionProducto").value = producto.descripcion;
    
    const previewImg = document.getElementById("preview-imagen");
    previewImg.src = producto.imagen;

    let imagenRuta = producto.imagen;

    // Escuchar el cambio de archivo si se selecciona una nueva imagen
    const inputImagen = document.getElementById("imagenProducto");
    inputImagen.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                imagenRuta = event.target.result;
                previewImg.src = imagenRuta;
            };
            reader.readAsDataURL(file);
        }
    });

    // Manejar el envío del formulario
    const form = document.getElementById("form-editar-producto");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombreProducto").value.trim();
        const precio = parseFloat(document.getElementById("precioProducto").value);
        const descripcion = document.getElementById("descripcionProducto").value.trim();

        // Actualizar el producto en la lista
        const index = productos.findIndex(p => p.id === productoId);
        if (index !== -1) {
            productos[index] = {
                id: productoId,
                nombre: nombre,
                precio: precio,
                descripcion: descripcion,
                imagen: imagenRuta
            };

            localStorage.setItem("dino_productos", JSON.stringify(productos));
            alert("Producto actualizado exitosamente.");
            window.location.href = "admin-productos.html";
        }
    });
});