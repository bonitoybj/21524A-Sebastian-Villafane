const obtenerPublicaciones = async () => {
    const response = await fetch('/api/publicaciones')
    const data = await response.json()
    return data;
}

const mostrarPublicaciones = (publicaciones, elementoHtml) => {

    let secciones = "";

    // Método para recorrer los registros
    publicaciones.forEach(publicacion => {
        secciones += `
        <div class="card " style="width: 18rem;">
        <img src="${publicacion.url_imagen}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${publicacion.titulo}</h5>
            <p class="card-text">${publicacion.detalle}</p>
            <p class="card-text">Autor: ${publicacion.autor}</p>
            <p class="card-text">Fecha: ${(publicacion.fecha_publicacion).split('T')[0]}</p>
            <p class="d-inline-flex gap-1">
                <button id="${publicacion.id}" type="button" class="btn btn-outline-primary btn-sm">Mas..</button>
                <a href="/admin/editar-publicacion/${publicacion.id}" id="${publicacion.id}" class="btn btn-outline-success btn-sm">Editar</a>                        
                <button id="${publicacion.id}" onclick=eliminarPublicacion(${publicacion.id}) class="btn btn-outline-danger btn-sm btn-eliminar">Eliminar</button>
            </p>
        </div>
    </div>
                
        `
    })


    // Se crea la lista
    elementoHtml.innerHTML = secciones;

}



document.addEventListener('DOMContentLoaded', async () => {

    const publicaciones = await obtenerPublicaciones()
    console.log(publicaciones)


    // Modificar el DOM para mostrar las publicaciones
    const main = document.querySelector('#lista-publicaciones')

    mostrarPublicaciones(publicaciones, main)
})

const eliminarPublicacion = async (id) => {
    // const id = e.target.id;

    // Se envía la petición al servidor
    const response = await fetch(`/api/publicacion/${id}`, {
        method: 'delete'
    })

    const data = await response.json();
    alert(data.msg)
    location.reload();
}