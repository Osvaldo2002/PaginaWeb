document.addEventListener('DOMContentLoaded', () => {
    const tablaBody = document.getElementById('tablaUsuariosBody');

    // Datos iniciales por defecto si no existen en localStorage
    const usuariosIniciales = [
        { id: 1, nombre: 'Juan Pérez', correo: 'juan.perez@duocuc.cl', fechaNacimiento: '1995-06-15', rol: 'Cliente', estado: 'Activo' },
        { id: 2, nombre: 'Carlos Rivas', correo: 'carl.rivas@duocuc.cl', fechaNacimiento: '1988-03-20', rol: 'Administrador', estado: 'Activo' },
        { id: 3, nombre: 'Carlos Rojas', correo: 'carlos.rojas@duocuc.cl', fechaNacimiento: '2001-11-10', rol: 'Cliente', estado: 'Inactivo' }
    ];

    function obtenerUsuarios() {
        const data = localStorage.getItem('usuarios');
        if (!data) {
            localStorage.setItem('usuarios', JSON.stringify(usuariosIniciales));
            return usuariosIniciales;
        }
        return JSON.parse(data);
    }

    function renderizarTabla() {
        const usuarios = obtenerUsuarios();
        tablaBody.innerHTML = '';

        if (usuarios.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="7" class="text-center py-3">No hay usuarios registrados.</td></tr>`;
            return;
        }

        usuarios.forEach(u => {
            const tr = document.createElement('tr');
            
            // Formatear fecha para mostrar DD/MM/AAAA
            const [year, month, day] = u.fechaNacimiento ? u.fechaNacimiento.split('-') : ['--', '--', '--'];
            const fechaFormateada = u.fechaNacimiento ? `${day}/${month}/${year}` : 'N/A';

            tr.innerHTML = `
                <td>${u.id}</td>
                <td class="fw-semibold">${u.nombre}</td>
                <td>${u.correo}</td>
                <td>${fechaFormateada}</td>
                <td><span class="badge ${u.rol === 'Administrador' ? 'bg-dark' : 'bg-primary'}">${u.rol}</span></td>
                <td><span class="badge ${u.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}">${u.estado || 'Activo'}</span></td>
                <td class="text-center">
                    <a href="admin-usuario-editar.html?id=${u.id}" class="btn btn-sm btn-outline-success me-1">Editar</a>
                    <button class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${u.id}">Eliminar</button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });

        adjuntarEventosEliminar();
    }

    function adjuntarEventosEliminar() {
        document.querySelectorAll('.btn-eliminar').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                if (confirm(`¿Estás seguro de eliminar el usuario ID ${id}?`)) {
                    let usuarios = obtenerUsuarios();
                    usuarios = usuarios.filter(u => u.id !== id);
                    localStorage.setItem('usuarios', JSON.stringify(usuarios));
                    renderizarTabla();
                }
            });
        });
    }

    renderizarTabla();
});