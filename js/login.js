document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const correoInput = document.getElementById('correo');
    const passwordInput = document.getElementById('password');

    const errorCorreo = document.getElementById('errorCorreo');
    const errorPassword = document.getElementById('errorPassword');
    const formStatus = document.getElementById('formStatus');

    const dominiosPermitidos = ['@duocuc.cl', '@profesor.duocuc.cl', '@gmail.com'];

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

        const esValido = dominiosPermitidos.some(dominio => val.toLowerCase().endsWith(dominio));

        if (!esValido) {
            setError(correoInput, errorCorreo, 'El correo debe terminar en @duocuc.cl, @profesor.duocuc.cl o @gmail.com');
            return false;
        }

        setSuccess(correoInput);
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

    correoInput.addEventListener('input', validarCorreo);
    passwordInput.addEventListener('input', validarPassword);

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const correoOk = validarCorreo();
        const passwordOk = validarPassword();

        if (correoOk && passwordOk) {
            formStatus.className = 'alert alert-success mt-3 d-block';
            formStatus.textContent = 'Iniciando sesión';
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1200);
        } else {
            formStatus.className = 'alert alert-danger mt-3 d-block';
            formStatus.textContent = 'Corrige los campos con error.';
        }
    });
});