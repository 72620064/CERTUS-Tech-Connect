document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los componentes del DOM
    const btnPublicar = document.getElementById('btnPublicar');
    const btnSubir = document.getElementById('btnSubir');
    const navBtnCrear = document.getElementById('navBtnCrear');
    const txtExperiencia = document.getElementById('experienceText');
    const txtTitulo = document.getElementById('postTitle');
    const placeholderMultimedia = document.querySelector('.upload-placeholder-text');

    // 1. Lógica del botón Publicar
    btnPublicar.addEventListener('click', () => {
        const tituloValue = txtTitulo.value.trim();
        const experienciaValue = txtExperiencia.value.trim();

        if (!tituloValue || !experienciaValue) {
            alert('Por favor, rellene tanto el título como su experiencia antes de publicar.');
            return;
        }

        // Simulación exitosa
        alert(`¡Publicación realizada con éxito!\n\nTítulo: ${tituloValue}`);
        
        // Resetear formulario
        txtTitulo.value = '';
        txtExperiencia.value = '';
        placeholderMultimedia.textContent = 'Arrastra o sube imagen';
    });

    // 2. Simulación interactiva de carga de archivos multimedia
    btnSubir.addEventListener('click', () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';

        fileInput.onchange = (event) => {
            const archivo = event.target.files[0];
            if (archivo) {
                placeholderMultimedia.textContent = `Archivo seleccionado: ${archivo.name}`;
                placeholderMultimedia.style.color = '#1a73e8';
            }
        };

        fileInput.click();
    });

    // 3. Foco inmediato al hacer clic en "Crear" desde el menú superior
    navBtnCrear.addEventListener('click', (e) => {
        e.preventDefault();
        txtExperiencia.focus();
    });
});