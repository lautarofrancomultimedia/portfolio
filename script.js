document.addEventListener('DOMContentLoaded', () => {
    const botonesFiltro = document.querySelectorAll('.boton-filtro');
    const proyectos = document.querySelectorAll('.item-proyecto');
    const etiquetaCuraduria = document.getElementById('etiqueta-curaduria');
    const tituloSeccion = document.getElementById('titulo-casos');

    proyectos.forEach(p => p.classList.add('animar-fade'));

    botonesFiltro.forEach(boton => {
        boton.addEventListener('click', (e) => {
            e.preventDefault();

            const filtroSeleccionado = boton.getAttribute('data-filtro');
            const nombreFiltro = boton.querySelector('.texto-filtro').textContent;

            botonesFiltro.forEach(b => b.classList.remove('filtro-activo'));
            boton.classList.add('filtro-activo');

            etiquetaCuraduria.textContent = nombreFiltro;
            tituloSeccion.textContent = 'Trabajos Realizados';

            proyectos.forEach(proyecto => {
                const categoriaProyecto = proyecto.getAttribute('data-categoria');

                proyecto.classList.remove('animar-fade');

                if (filtroSeleccionado === 'todos' || categoriaProyecto === filtroSeleccionado) {
                    proyecto.classList.remove('oculto');

                    setTimeout(() => {
                        proyecto.classList.add('animar-fade');
                    }, 10);
                } else {
                    proyecto.classList.add('oculto');
                }
            });
        });
    });

    // ==========================================
    // LÓGICA DE ANIMACIÓN AL HACER SCROLL
    // ==========================================

    const observador = new IntersectionObserver((entradas, observador) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');

                observador.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: "0px 0px 250px 0px" // Dispara la animación un poquito antes de llegar al borde
    });

    const elementosOcultos = document.querySelectorAll('.revelar');
    elementosOcultos.forEach(el => observador.observe(el));

    // ==========================================
    // LÓGICA DEL VISOR DE IMÁGENES (LIGHTBOX)
    // ==========================================
    const visor = document.getElementById('visor-imagenes');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const botonCerrar = document.getElementById('cerrar-visor');

    const cerrarVisor = () => {
        visor.classList.remove('activo');
        document.body.classList.remove('no-scroll'); // Devuelve el scroll al fondo
        document.body.style.paddingRight = '';
    };

    // 1. Abrir el visor al hacer clic en CUALQUIER PARTE del proyecto
    proyectos.forEach(proyecto => {
        proyecto.addEventListener('click', (e) => {

            const categoria = proyecto.getAttribute('data-categoria');

            if (categoria === 'ui-ux') {
                return;
            }

            // Si NO es ui-ux (ej. posters, redes), sigue la lógica normal del visor:
            const imagen = proyecto.querySelector('img');

            if (imagen) {
                imagenAmpliada.src = imagen.src;

                const anchoScrollbar = window.innerWidth - document.documentElement.clientWidth;
                document.body.style.paddingRight = `${anchoScrollbar}px`;

                visor.classList.add('activo');
                document.body.classList.add('no-scroll');
            }
        });
    });

    // 2. Cerrar con el botón X
    botonCerrar.addEventListener('click', cerrarVisor);

    // 3. Cerrar al hacer clic en la zona oscura (fuera de la imagen)
    visor.addEventListener('click', (e) => {
        if (e.target === visor) {
            cerrarVisor();
        }
    });

    // 4. Cerrar presionando la tecla "Escape"
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && visor.classList.contains('activo')) {
            cerrarVisor();
        }
    });
});
