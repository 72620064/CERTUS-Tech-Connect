//BARRA DE NAVEGACIÓN
//Inicializar todos los Tooltips de Bootstrap en la página
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

async function cargarFragmento(idContenedor, rutaArchivo, callback) {
    try {
        const respuesta = await fetch(rutaArchivo);
        if (!respuesta.ok) throw new Error(`Error al cargar ${rutaArchivo}`);
        const html = await respuesta.text();
        
        const contenedor = document.getElementById(idContenedor);
        if (contenedor) {
            contenedor.innerHTML = html;
            // Si hay un callback (como activar los tooltips), lo ejecutamos
            if (callback) callback();
        }
    } catch (error) {
        console.error(error);
    }
}

// Ejecutar la carga automáticamente en cualquier página que use este script
document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Intentar cargar el Navbar si el contenedor existe en la página
    if (document.getElementById("global-navbar")) {
        cargarFragmento("global-navbar", "fragments/navbar.html", () => {
            // Inicializar todos los Tooltips de Bootstrap nativos en el Navbar recién inyectado
            var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.map(function (tooltipTriggerEl) {
                return new bootstrap.Tooltip(tooltipTriggerEl);
            });
        });
    }

    // 2. Intentar cargar el Footer si el contenedor existe en la página
    if (document.getElementById("global-footer")) {
        cargarFragmento("global-footer", "fragments/footer.html");
    }
});