

// Se obtiene la publicación a editar
const obtenerPublicacion = async (id) => {
    const response = await fetch(`/api/publicacion/${id}`)
    const data = await response.json()
    return data;
}

// Referencia al elemento de formulario html
const formEditar = document.querySelector("#form-editar")

// Se obtiene el id de la publicación a editar
const id = formEditar.dataset.id

// Cuando se carga el contenido del html y recursos estáticos, se solicita la publicación y se muestran en el formulario
document.addEventListener('DOMContentLoaded', async () => {
    // Se obtiene la publicación
    const publicacion = await obtenerPublicacion(id);

    // Referencia a los elementos del formulario
    const titulo = document.querySelector('#titulo-post')
    const detalle = document.querySelector('#detalle-post')
    const autor = document.querySelector('#autor')
    const url_imagen = document.querySelector('#url-img')
    const fecha_publicacion = document.querySelector('#fecha')
    const imgPreview = document.querySelector('#img-preview')


    // Los Valores obtenidos se asignan a los campos del formulario
    titulo.value = publicacion.titulo;
    detalle.value = publicacion.detalle;
    autor.value = publicacion.autor;
    url_imagen.value = publicacion.url_imagen;
    fecha_publicacion.value = new Date(publicacion.fecha_publicacion).toISOString().split('T')[0];
    imgPreview.src = publicacion.url_imagen;

})

// Evento para guardar los cambios
formEditar.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Se capturan los datos del formulario
    const titulo = document.querySelector('#titulo-post').value;
    const detalle = document.querySelector('#detalle-post').value;
    const autor = document.querySelector('#autor').value;
    const url_imagen = document.querySelector('#url-img').value;
    const fecha_publicacion = document.querySelector('#fecha').value;

    // Enviar al servidor
    const response = await fetch(`/api/publicacion/${id}`, {
        method: 'put',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify({ titulo, detalle, autor, url_imagen, fecha_publicacion})
    })
    const data = await response.json();

    alert(data.msg);
    location.href = "/"

})