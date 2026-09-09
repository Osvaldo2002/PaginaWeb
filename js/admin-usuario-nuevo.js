document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('nuevoUsuarioForm');
    const nombreInput = document.getElementById('nombreUsuario');
    const correoInput = document.getElementById('correoUsuario');
    const fechaInput = document.getElementById('fechaNacimiento');
    const passInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirmPassword');
    const rolSelect = document.getElementById('rolUsuario');
    const estadoSelect = document.getElementById('estadoUsuario');
    const formStatus = document.getElementById('formStatus');

    function setError(input, errorId, msg) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        const errElem = document.getElementById(errorId);
        if (errElem) errElem.textContent = msg;
    }

    function setSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    function validarForm() {
        let esValido = true;

        if (!nombreInput.value.trim() || nombreInput.value.length > 50) {
            setError(nombreInput, 'errorNombre', 'El nombre es obligatorio (máx 50 caracteres).');
            esValido = false;
        } else { setSuccess(nombreInput); }

        if (!correoInput.value.trim().toLowerCase().endsWith('@duocuc.cl')) {
            setError(correoInput, 'errorCorreo', 'Debe ingresar un correo válido terminado en @duocuc.cl');
            esValido = false;
        } else { setSuccess(correoInput); }

        if (!fechaInput.value) {
            setError(fechaInput, 'errorFecha', 'La fecha es obligatoria.');
            esValido = false;
        } else {
            const fechaNac = new Date(fechaInput.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaNac.getFullYear();
            const mes = hoy.getMonth() - fechaNac.getMonth();
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) edad--;
            
            if (edad < 18) {
                setError(fechaInput, 'errorFecha', 'Debe ser mayor de 18 años.');
                esValido = false;
            } else { setSuccess(fechaInput); }
        }

        if (passInput.value.length < 4 || passInput.value.length > 10) {
            setError(passInput, 'errorPassword', 'Debe tener entre 4 y 10 caracteres.');
            esValido = false;
        } else { setSuccess(passInput); }

        if (confirmPassInput.value !== passInput.value || !confirmPassInput.value) {
            setError(confirmPassInput, 'errorConfirmPassword', 'Las contraseñas no coinciden.');
            esValido = false;
        } else { setSuccess(confirmPassInput); }

        return esValido;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validarForm()) {
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            
            const nuevoUsuario = {
                id: usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1,
                nombre: nombreInput.value.trim(),
                correo: correoInput.value.trim(),
                fechaNacimiento: fechaInput.value,
                password: passInput.value.trim(),
                rol: rolSelect.value,
                estado: estadoSelect.value
            };

            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            formStatus.className = 'alert alert-success mt-3 d-block';
            formStatus.textContent = 'Usuario creado con éxito. Redirigiendo...';

            setTimeout(() => {
                window.location.href = 'admin-usuarios.html';
            }, 1200);
        } else {
            formStatus.className = 'alert alert-danger mt-3 d-block';
            formStatus.textContent = 'Revisa los campos obligatorios.';
        }
    });
});