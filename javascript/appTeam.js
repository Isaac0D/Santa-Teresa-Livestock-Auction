/*----------------------------------- URL Refresh -----------------------------------*/
window.onload = function() {
    if (window.location.hostname) {
        history.replaceState(null, null, ' ');
    }
}

/*----------------------------------- Page Top -----------------------------------*/
function scrollToTop() {
    window.scrollTo(0, 0);
}
scrollToTop();


/*----------------------------------- Loader -----------------------------------*/
const loaderMinTime = 2000;

window.addEventListener('load', function () {
    setTimeout(() => {
        tryToHideLoader();
    }, loaderMinTime);
});

const loader = document.getElementById('loader');
const hidden = document.getElementById('hiddenBody');

function tryToHideLoader() {
    loader.classList.add('fade-out');

    // Duración de la transición en ms (debe coincidir con CSS)
    const fadeDuration = 500;

    setTimeout(function () {
        loader.style.display = 'none';
        hidden.style.overflow = 'visible';
        hidden.style.overflowX = 'hidden';
        
        const homeEls = document.querySelectorAll('.reveal-home');
        homeEls.forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('visible');
            }, i * 150); // efecto en cascada
        });
    }, fadeDuration);
}



/*----------------------------------- Translate -----------------------------------*/ 
$.getJSON('javascript/lang.json', function(json){

    // --- Función auxiliar para aplicar textos ---
    function translatePage(lang) {
        $('.lang').each(function(){
            let key = $(this).attr('key');
            if (json[lang][key]) {
                $(this).text(json[lang][key]);
            }
        });
    }

    // --- 1. Configuración Inicial ---
    // Si no hay idioma guardado, forzamos 'en' (Inglés) como default
    if(!localStorage.getItem("lang")){
        localStorage.setItem("lang", "en");
    }
    let currentLang = localStorage.getItem("lang");

    // --- 2. Sincronización Visual del Switch ---
    // Si el idioma actual es 'en', marcamos el checkbox (true) para que se vea activo/pintado.
    // Si es 'es', se queda desmarcado (false).
    $('#languageToggle').prop('checked', currentLang === 'en');

    // --- 3. Traducción inicial al cargar la página ---
    translatePage(currentLang);

    // --- 4. Evento: Cambio directo en el switch ---
    $('#languageToggle').change(function() {
        let lang;
        
        if(this.checked) {
            lang = "en"; // Activado = Inglés
        } else {
            lang = "es"; // Desactivado = Español
        }

        localStorage.setItem("lang", lang);
        translatePage(lang);
    });

    // --- 5. Evento: Click en el contenedor (Banderas o espacio) ---
    $('.language-wrapper').click(function(e) {
        // Verificamos que el clic NO haya sido en el propio switch para evitar conflicto doble
        if (!$(e.target).closest('.switch').length) {
            
            let toggle = $('#languageToggle');
            
            // Invertimos el estado actual del checkbox manualmente
            toggle.prop('checked', !toggle.prop('checked'));
            
            // Disparamos el evento 'change' para que se ejecute la lógica del paso 4
            toggle.trigger('change');
        }
    });

});


/*----------------------------------- menu -----------------------------------*/ 
document.addEventListener('DOMContentLoaded', () => {
    // CAMBIO AQUÍ: Seleccionamos el nuevo div con las imágenes
    const hamburgerBtn = document.querySelector('.menu-trigger'); 
    
    const mobileNav = document.querySelector('.mobile-nav');

    // El resto de la función se queda EXACTAMENTE IGUAL
    function toggleMenu() {
        hamburgerBtn.classList.toggle('is-active');
        mobileNav.classList.toggle('is-active');
    }

    hamburgerBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleMenu();
    });

    document.addEventListener('click', (event) => {
        const isMenuOpen = mobileNav.classList.contains('is-active');
        const isClickInsideNav = mobileNav.contains(event.target);
        
        // Agregamos una validación extra para que no se cierre si damos click en los mismos iconos
        const isClickOnButton = hamburgerBtn.contains(event.target);

        if (isMenuOpen && !isClickInsideNav && !isClickOnButton) {
            toggleMenu();
        }
    });

    mobileNav.addEventListener('click', (event) => {
        event.stopPropagation();
    });
});


/*----------------------------------- animations -----------------------------------*/ 
document.addEventListener('DOMContentLoaded', function () {
    const revealElements = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Si solo quieres que la animación se dispare una vez
            observer.unobserve(entry.target);
        }
        });
    }, {
        threshold: 0.7 // 10% del elemento visible activa la animación
    });

    revealElements.forEach(el => observer.observe(el));
});


/*----------------------------------- scrollAnimation -----------------------------------*/ 
// Espera a que todo el contenido (DOM) esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // 1. Selecciona los elementos que necesitas
    const header = document.querySelector('header');
    const homeSection = document.querySelector('.video-contenedor');
    const logo = document.querySelector('.logoNav');

    // 3. Define la función que manejará el scroll
    function handleHeaderScroll() {
        // Obtiene la altura de la sección 'home'
        const homeHeight = homeSection.offsetHeight;
        
        // Obtiene la posición actual del scroll vertical
        const scrollY = window.scrollY;

        // 4. Compara el scroll con la altura de la sección
        // Queremos que el cambio ocurra justo cuando el scroll pasa el final de la sección 'home'
        if (scrollY > homeHeight) {
            // El usuario ha pasado la sección 'home'
            header.classList.add('scrolled');
            logo.classList.add('logo-scroll');

        } else {
            // El usuario está dentro de la sección 'home'
            header.classList.remove('scrolled');
            logo.classList.remove('logo-scroll');

        }
    }

    // 5. Añade el "escuchador" de evento 'scroll' a la ventana
    window.addEventListener('scroll', handleHeaderScroll);
});