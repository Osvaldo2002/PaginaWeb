document.addEventListener('DOMContentLoaded', () => {
    const registroForm = document.getElementById('registroForm');
    
    const nombreInput = document.getElementById('nombre');
    const correoInput = document.getElementById('correo');
    const fechaInput = document.getElementById('fechaNacimiento');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const terminosInput = document.getElementById('terminos');

    const errorNombre = document.getElementById('errorNombre');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorFecha = document.getElementById('errorFecha');
    const errorPassword = document.getElementById('errorPassword');
    const errorConfirmPassword = document.getElementById('errorConfirmPassword');
    const errorTerminos = document.getElementById('errorTerminos');
    const formStatus = document.getElementById('formStatus');

    function validarNombre() {
        const val = nombreInput.value.trim();
        if (!val) {
            setError(nombreInput, errorNombre, 'El nombre es obligatorio.');
            return false;
        }
        if (val.length > 50) {
            setError(nombreInput, errorNombre, 'El nombre no puede superar los 50 caracteres.');
            return false;
        }
        setSuccess(nombreInput);
        return true;
    }

    function validarCorreo() {
        const val = correoInput.value.trim();
        if (!val) {
            setError(correoInput, errorCorreo, 'El correo electrónico es obligatorio.');
            return false;
        }
        if (val.length > 100) {
            setError(correoInput, errorCorreo, 'El correo no debe superar los 100 caracteres.');
            return false;
        }
        if (!val.toLowerCase().endsWith('@duocuc.cl')) {
            setError(correoInput, errorCorreo, 'Debe terminar en @duocuc.cl');
            return false;
        }
        setSuccess(correoInput);
        return true;
    }

    function validarFechaNacimiento() {
        const val = fechaInput.value;
        if (!val) {
            setError(fechaInput, errorFecha, 'La fecha de nacimiento es obligatoria.');
            return false;
        }

        const fechaNac = new Date(val);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }

        if (edad < 18) {
            setError(fechaInput, errorFecha, 'Debes ser mayor de 18 años para hacer compras en el rancho.');
            return false;
        }

        setSuccess(fechaInput);
        return true;
    }

    function validarPassword() {
        const val = passwordInput.value.trim();
        if (!val) {
            setError(passwordInput, errorPassword, 'La contraseña es obligatoria.');
            return false;
        }
        if (val.length < 4 || val.length > 10) {
            setError(passwordInput, errorPassword, 'La contraseña debe tener entre 4 y 10 caracteres.');
            return false;
        }
        setSuccess(passwordInput);
        
        if (confirmPasswordInput.value.trim()) {
            validarConfirmPassword();
        }
        return true;
    }

    function validarConfirmPassword() {
        const passVal = passwordInput.value.trim();
        const confirmVal = confirmPasswordInput.value.trim();

        if (!confirmVal) {
            setError(confirmPasswordInput, errorConfirmPassword, 'Debes confirmar la contraseña.');
            return false;
        }
        if (passVal !== confirmVal) {
            setError(confirmPasswordInput, errorConfirmPassword, 'Las contraseñas no coinciden.');
            return false;
        }
        setSuccess(confirmPasswordInput);
        return true;
    }

    function validarTerminos() {
        if (!terminosInput.checked) {
            terminosInput.classList.remove('is-valid');
            terminosInput.classList.add('is-invalid');
            errorTerminos.textContent = 'Debes aceptar los términos y condiciones.';
            return false;
        }
        terminosInput.classList.remove('is-invalid');
        terminosInput.classList.add('is-valid');
        return true;
    }

    function setError(input, errorElement, mensaje) {
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        errorElement.textContent = mensaje;
    }

    function setSuccess(input) {
        input.classList.remove('is-invalid');
        input.classList.add('is-valid');
    }

    nombreInput.addEventListener('input', validarNombre);
    correoInput.addEventListener('input', validarCorreo);
    fechaInput.addEventListener('change', validarFechaNacimiento);
    passwordInput.addEventListener('input', validarPassword);
    confirmPasswordInput.addEventListener('input', validarConfirmPassword);
    terminosInput.addEventListener('change', validarTerminos);

    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nombreOk = validarNombre();
        const correoOk = validarCorreo();
        const fechaOk = validarFechaNacimiento();
        const passOk = validarPassword();
        const confirmPassOk = validarConfirmPassword();
        const terminosOk = validarTerminos();

        if (nombreOk && correoOk && fechaOk && passOk && confirmPassOk && terminosOk) {
            const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            const nuevoUsuario = {
                id: usuarios.length + 1,
                nombre: nombreInput.value.trim(),
                correo: correoInput.value.trim(),
                password: passwordInput.value.trim(),
                rol: 'Cliente'
            };
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            formStatus.className = 'alert alert-success mt-3 d-block';
            formStatus.textContent = 'Registrado exitosamente, redirigiendo al inicio de sesión.';

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        } else {
            formStatus.className = 'alert alert-danger mt-3 d-block';
            formStatus.textContent = 'Debes completar correctamente todos los campos.';
        }
    });
});