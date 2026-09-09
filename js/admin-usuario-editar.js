document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('editarUsuarioForm');
    const idInput = document.getElementById('idUsuario');
    const nombreInput = document.getElementById('nombreUsuario');
    const correoInput = document.getElementById('correoUsuario');
    const fechaInput = document.getElementById('fechaNacimiento');
    const rolSelect = document.getElementById('rolUsuario');
    const estadoSelect = document.getElementById('estadoUsuario');
    const formStatus = document.getElementById('formStatus');

    // 1. Obtener ID de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get('id');

    if (!idParam) {
        alert('No se especificó un ID de usuario en la URL.');
        window.location.href = 'admin-usuarios.html';
        return;
    }

    const usuarioId = parseInt(idParam, 10);

    // 2. Datos base por si el localStorage aún no existe
    const usuariosIniciales = [
        { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@duocuc.cl', fechaNacimiento: '1995-06-15', rol: 'Cliente', estado: 'Activo' },
        { id: 2, nombre: 'Carlos Rivas', correo: 'carl.rivas@duocuc.cl', fechaNacimiento: '1988-03-20', rol: 'Administrador', estado: 'Activo' },
        { id: 3, nombre: 'Carlos Rojas', correo: 'carlos.rojas@duocuc.cl', fechaNacimiento: '2001-11-10', rol: 'Cliente', estado: 'Inactivo' }
    ];

    let data = localStorage.getItem('usuarios');
    let usuarios = [];

    if (!data) {
        localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
        usuarios = usuariosIniciales;
    } else {
        usuarios = JSON.parse(data);
    }

    // 3. Buscar usuario coincidente
    const usuarioActual = usuarios.find(u => Number(u.id) === usuarioId);

    if (!usuarioActual) {
        alert(`El usuario con ID ${usuarioId} no existe.`);
        window.location.href = 'admin-usuarios.html';
        return;
    }

    // 4. Poblar el formulario
    idInput.value = usuarioActual.id;
    nombreInput.value = usuarioActual.nombre;
    correoInput.value = usuarioActual.correo;
    fechaInput.value = usuarioActual.fechaNacimiento || '';
    rolSelect.value = usuarioActual.rol || 'Cliente';
    estadoSelect.value = usuarioActual.estado || 'Activo';

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

        return esValido;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (validarForm()) {
            usuarioActual.nombre = nombreInput.value.trim();
            usuarioActual.correo = correoInput.value.trim();
            usuarioActual.fechaNacimiento = fechaInput.value;
            usuarioActual.rol = rolSelect.value;
            usuarioActual.estado = estadoSelect.value;

            const index = usuarios.findIndex(u => Number(u.id) === usuarioId);
            if (index !== -1) {
                usuarios[index] = usuarioActual;
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
            }

            formStatus.className = 'alert alert-success mt-3 d-block';
            formStatus.textContent = 'Cambios guardados exitosamente. Redirigiendo...';

            setTimeout(() => {
                window.location.href = 'admin-usuarios.html';
            }, 1200);
        } else {
            formStatus.className = 'alert alert-danger mt-3 d-block';
            formStatus.textContent = 'Revisa los campos obligatorios.';
        }
    });
});