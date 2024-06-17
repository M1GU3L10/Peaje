document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://localhost:5259/api/Peaje';

    function renderPeaje(peajes) {
        const tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        peajes.forEach(peaje => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${peaje.placa}</td>
                <td>${peaje.nombrePeaje}</td>
                <td>${peaje.idCategoriaTarifa}</td>
                <td>${peaje.fecha}</td>
                <td>${peaje.valor}</td>
                <td>
                        <a class="btn btn-sm btn-primary" href="/editar?id=${peaje.id}"><i class="fa-solid fa-pencil"></i></a>
                        <a class="btn btn-sm btn-danger" onclick="eliminarPeaje(${peaje.id})"><i class="fa-solid fa-trash-can"></i></a>
                    </td>
            `;

            tbody.appendChild(tr);
        });
    }

    axios.get(apiUrl)
        .then(response => {
            const peajes = response.data;
            renderPeaje(peajes);
        })
        .catch(error => {
            console.error('Error al obtener los peajes:', error);
        });
});

function eliminarPeaje(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Una vez eliminado, no podrás recuperar este producto.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminarlo',
        cancelButtonText: 'Cancelar',
        backdrop: false
    }).then((result) => {
        if (result.isConfirmed) {
            axios.delete(`http://localhost:5259/api/Peaje/${id}`)
                .then(response => {
                    Swal.fire({
                        icon: "success",
                        title: "Eliminado correctamente",
                        showConfirmButton: false,
                        timer: 1500,
                        backdrop: false
                      });
                    console.log('Producto eliminado exitosamente:', response.data);
                    setTimeout(() => {
                        location.reload();
                    }, 2000);

                })
                .catch(error => {
                    Swal.fire(
                        'Error',
                        'Hubo un error al eliminar el servicio. Por favor, inténtalo de nuevo.',
                        'error'
                    );
                    console.error('Error al eliminar el Producto, Revisar la ruta:', error);
                });
        }
    });
}