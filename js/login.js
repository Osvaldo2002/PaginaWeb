document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const correoInput = document.getElementById("correo");
    const passwordInput = document.getElementById("password");
    const formStatus = document.getElementById("formStatus");

    const usuariosPorDefecto = [
        {
            id: 1,
            nombre: "Juan Pérez",
            correo: "juan.perez@duocuc.cl",
            password: "password123",
            rol: "Cliente"
        },
        {
            id: 2,
            nombre: "Carlos Rivas",
            correo: "carl.rivas@duocuc.cl",
            password: "admin123",
            rol: "Administrador"
        }
    ];

    if (!localStorage.getItem("usuarios")) {
        localStorage.setItem("usuarios", JSON.stringify(usuariosPorDefecto));
    }

    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const correo = correoInput.value.trim();
        const password = passwordInput.value.trim();

        let esValido = true;
        const tieneDominioValido = correo.endsWith("@duocuc.cl");

        if (!correo || !tieneDominioValido) {
            correoInput.classList.add("is-invalid");
            esValido = false;
        } else {
            correoInput.classList.remove("is-invalid");
            correoInput.classList.add("is-valid");
        }

        if (!password || password.length < 4 || password.length > 10) {
            passwordInput.classList.add("is-invalid");
            esValido = false;
        } else {
            passwordInput.classList.remove("is-invalid");
            passwordInput.classList.add("is-valid");
        }

        if (!esValido) return;

        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuarios.find(
            u => u.correo.toLowerCase() === correo.toLowerCase() && u.password === password
        );

        if (usuarioEncontrado) {
            localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));

            formStatus.className = "alert alert-success mt-3";
            formStatus.textContent = `¡Bienvenido/a, ${usuarioEncontrado.nombre}! Redirigiendo...`;

            setTimeout(() => {
                if (usuarioEncontrado.rol === "Administrador") {
                    window.location.href = "admin-index.html";
                } else {
                    window.location.href = "index.html";
                }
            }, 1500);

        } else {
            formStatus.className = "alert alert-danger mt-3";
            formStatus.textContent = "Correo o contraseña incorrectos. Verifica tus datos.";
        }
    });
});