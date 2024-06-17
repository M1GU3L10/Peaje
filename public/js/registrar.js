document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();

    let placa = document.getElementById('placa').value;
    let nombrePeaje = document.getElementById('nombrePeaje').value;
    let idCategoriaTarifa = document.getElementById('idCategoriaTarifa').value;
    let fecha = document.getElementById('fecha').value;
    let valor = document.getElementById('valor').value;

    let data = {
        placa: placa,
        nombrePeaje: nombrePeaje,
        idCategoriaTarifa: idCategoriaTarifa,
        fecha: fecha,
        valor: parseInt(valor) 
    };

    axios.post('http://localhost:5259/api/Peaje', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(function (response) {
            Swal.fire('Éxito', 'Datos guardados correctamente', 'success');

        }).then(() => {
            window.location.href = '/'
        })
        .catch(function (error) {
            console.error('Error al guardar los datos:', error.response ? error.response.data : error);
            Swal.fire('Error', 'Hubo un problema al guardar los datos', 'error');
        });
});