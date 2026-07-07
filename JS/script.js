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

//EMPLEOS
document.addEventListener("DOMContentLoaded", function () {
    const btnAnadir = document.getElementById("btnAnadirPreferencia");
    const inputPreferencia = document.getElementById("preferenciaInput");
    const listaPreferencias = document.getElementById("listaPreferencias");

    if (btnAnadir && inputPreferencia && listaPreferencias) {
        btnAnadir.addEventListener("click", function () {
            const texto = inputPreferencia.value.trim();

            // Validar que el usuario no envíe un espacio vacío
            if (texto === "") {
                alert("Por favor, escribe una preferencia válida.");
                return;
            }

            // Calcular el número correlativo contando los elementos actuales de la lista
            const numeroSiguiente = listaPreferencias.children.length + 1;

            // Crear el nuevo elemento de la lista estructurado con HTML
            const nuevoItem = document.createElement("li");
            nuevoItem.className = "d-flex align-items-start gap-2";
            nuevoItem.style.fontSize = "1rem";
            nuevoItem.style.color = "#334155";

            // Inyectar el check de éxito verde y el contenido estructurado
            nuevoItem.innerHTML = `
                <span class="text-success fw-bold">✓</span>
                <span>${numeroSiguiente}. ${texto}</span>
            `;

            // Agregar el elemento al final de la lista visual
            listaPreferencias.appendChild(nuevoItem);

            // Limpiar la caja de texto y devolver el foco al input
            inputPreferencia.value = "";
            inputPreferencia.focus();
        });
    }
});

// LÓGICA PARA ELIMINAR Y POSTULAR EN EMPLEOS FAVORITOS
const listaGuardados = document.getElementById("listaGuardados");

if (listaGuardados) {
    listaGuardados.addEventListener("click", function (e) {
        
        // === CASO 1: DETECTAR CLIC EN EL BOTÓN "POSTULAR" ===
        // Comprobamos si el elemento clickeado es el botón de postular
        if (e.target.classList.contains("btn-primary") || e.target.classList.contains("btn-success")) {
            const boton = e.target;
            
            // Si aún no ha postulado
            if (!boton.classList.contains("btn-success")) {
                // Cambiamos el color: removemos azul primario y ponemos verde éxito (invertido)
                boton.classList.remove("btn-primary");
                boton.classList.add("btn-success");
                
                // Cambiamos el texto e icono
                boton.innerHTML = `<i class="fa-solid fa-check me-1"></i> Postulado`;
            } else {
                // Opcional: Si vuelve a dar clic, puede revertir la postulación
                boton.classList.remove("btn-success");
                boton.classList.add("btn-primary");
                boton.innerHTML = "Postular";
            }
            return; // Salimos de la función para que no ejecute el código de eliminar
        }

        // === CASO 2: DETECTAR CLIC EN EL BOTÓN "ELIMINAR" (Se mantiene igual) ===
        const botonEliminar = e.target.closest(".btn-eliminar-favorito");
        if (botonEliminar) {
            const tarjetaEmpleo = botonEliminar.closest(".p-3");
            if (tarjetaEmpleo) {
                tarjetaEmpleo.style.transition = "all 0.3s ease";
                tarjetaEmpleo.style.opacity = "0";
                tarjetaEmpleo.style.transform = "scale(0.95)";
                
                setTimeout(() => {
                    tarjetaEmpleo.remove();
                    if (listaGuardados.children.length === 0) {
                        listaGuardados.innerHTML = `
                            <div class="text-center py-4 text-muted">
                                <i class="fa-regular fa-folder-open display-6 mb-2"></i>
                                <p class="mb-0">No tienes empleos guardados actualmente.</p>
                            </div>
                        `;
                    }
                }, 300);
            }
        }
    });
}

// LÓGICA PARA PUBLICAR UN NUEVO EMPLEO DINÁMICAMENTE
const formEmpleo = document.getElementById("formAnunciarEmpleo");
const contenedorEmpleos = document.getElementById("contenedorEmpleosPrincipal");

if (formEmpleo && contenedorEmpleos) {
    formEmpleo.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario

        // Capturar los valores ingresados por el usuario
        const puesto = document.getElementById("postPuesto").value.trim();
        const empresa = document.getElementById("postEmpresa").value.trim();
        const distrito = document.getElementById("postDistrito").value.trim();
        const modalidad = document.getElementById("postModalidad").value;
        const jornada = document.getElementById("postJornada").value;

        // Crear la estructura de la nueva fila de trabajo
        const nuevaOferta = document.createElement("div");
        nuevaOferta.className = "job-item-row";
        nuevaOferta.style.opacity = "0"; // Iniciamos invisible para la animación
        nuevaOferta.style.transition = "all 0.5s ease";

        // Inyectamos el HTML idéntico a las ofertas nativas de CERTUS Connect
        nuevaOferta.innerHTML = `
            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=100" alt="Empleo nuevo" class="job-company-logo">
            <div>
                <h4 class="job-title"><a href="#">${puesto}</a></h4>
                <p class="job-company-name">${empresa} · ${distrito}, Lima</p>
                <p class="job-location-tag">${jornada} · ${modalidad} · Recién publicado</p>
                <span class="job-badge-promo" style="background-color: #e6fcf5; color: #0ca678;">Bolsa Egresados</span>
                <div class="job-easy-apply">
                    <i class="fa-solid fa-bolt"></i> Postulación rápida institucional
                </div>
            </div>
            <button class="btn-dismiss-job" title="Descartar"><i class="fa-solid fa-xmark"></i></button>
        `;

        // Agregamos la oferta abajo del todo del contenedor central
        contenedorEmpleos.appendChild(nuevaOferta);

        // Cerramos la ventana modal usando la API nativa de Bootstrap 5
        const modalElement = document.getElementById("anunciarEmpleoModal");
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();

        // Reseteamos los campos del formulario para la próxima publicación
        formEmpleo.reset();

        // Pequeño truco de retraso para activar la animación de entrada suave
        setTimeout(() => {
            nuevaOferta.style.opacity = "1";
        }, 100);
    });
}