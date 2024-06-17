document.addEventListener('DOMContentLoaded', async function () {
    const apiUrl = 'http://localhost:5259/api/Peaje';

    async function MostrarDatos(id) {
        try {
            const response = await fetch(`${apiUrl}/${id}`);

            if (!response.ok) throw new Error('Error en la solicitud');

            const vehiculo = await response.json(); 

            idvehiculo = vehiculo.id;
            document.getElementById('placa').value = vehiculo.placa;
            document.getElementById('nombrePeaje').value = vehiculo.nombrePeaje;
            document.getElementById('idCategoriaTarifa').value = vehiculo.idCategoriaTarifa;
            let fecha = new Date(vehiculo.fecha);
            let fechaFormateada = fecha.toISOString().split('T')[0];
            document.getElementById('fecha').value = fechaFormateada;
            document.getElementById('valor').value = vehiculo.valor;

        } catch (error) {  
            console.error('Error al obtener los detalles del vehiculo:', error);
        }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    await MostrarDatos(id);

    document.getElementById('btn-editar').addEventListener('click', function (event) {
        event.preventDefault(); 

        const Modificar = {
            id: idvehiculo,
            placa: document.getElementById('placa').value,
            nombrePeaje: document.getElementById('nombrePeaje').value,
            idCategoriaTarifa: document.getElementById('idCategoriaTarifa').value,
            fecha: document.getElementById('fecha').value,
            valor: document.getElementById('valor').value
        };


        axios.put(`${apiUrl}/${idvehiculo}`, Modificar)
            .then(response => {
                if (response.data.success) {
                    Swal.fire({
                        title: 'Error al actualizar el vehiculo',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'OK',
                        backdrop: false
                    });
                } else {
                    Swal.fire({
                        title: 'vehiculo actualizado correctamente',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        backdrop: false
                    }).then(() => {
                        window.location.href = '/';
                    });
                }
            })
            .catch(error => {
                console.error('Error al actualizar el vehiculo:', error);
                Swal.fire({
                    title: 'Error al actualizar el Servicio',
                    text: 'Hubo un problema al intentar actualizar el Servicio. Por favor, intenta de nuevo más tarde.',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    backdrop: false
                });
                console.log(Modificar)
            });
    });

});