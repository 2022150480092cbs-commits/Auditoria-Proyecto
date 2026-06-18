// Base de datos de información oficial para JACCAF COMPANY extraída de Casas Platino
const infoCiudades = {
    "san-miguel": {
        nombre: "San Miguel de Allende",
        lema: "Cultura y tradición",
        columnas: [
            {
                titulo: "Vive San Miguel de Allende, la segunda mejor ciudad del mundo.",
                texto: "Según los lectores de la reconocida revista Travel & Leisure, destacando por su imponente arquitectura colonial y un estilo de vida bohemio y artístico de primer nivel.",
                img: "https://images.unsplash.com/photo-1599824434190-33310065963c?auto=format&fit=crop&w=500&q=80"
            },
            {
                titulo: "Pero si lo tuyo es el ecoturismo, San Miguel también es tu ciudad.",
                texto: "Muy cerca podrás encontrar El Charco del Ingenio, una reserva natural con un jardín botánico espectacular que cuenta con 15 paradas informativas e impresionantes vistas.",
                img: "https://images.unsplash.com/photo-1516244081043-41a6b0c2a265?auto=format&fit=crop&w=500&q=80"
            },
            {
                titulo: "Un lugar que combina lo mejor de dos mundos.",
                texto: "Modernidad y vanguardia en sus plazas comerciales equipadas con tiendas de franquicia internacional, distribuidores viales eficientes y conectividad de alta velocidad.",
                img: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=500&q=80"
            }
        ],
        desarrollo: {
            nombre: "PORTALES",
            img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80"
        }
    },
    "queretaro": {
        nombre: "Querétaro",
        lema: "Crecimiento, plusvalía e historia",
        columnas: [
            {
                titulo: "Una de las economías más estables y dinámicas del país.",
                texto: "Querétaro ofrece un desarrollo industrial y empresarial sobresaliente en el bajío, ideal para asegurar el Retorno de Inversión (ROI) patrimonial.",
                img: "https://www.liderempresarial.com/wp-content/uploads/2021/07/20191014_fotodeldia_acueducto-e1626273371399.jpeg"
            },
            {
                titulo: "Calidad de vida y conectividad de primer nivel.",
                texto: "Desarrollos ubicados estratégicamente cerca de centros educativos de alto prestigio, zonas recreativas y vialidades principales.",
                img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
            },
            {
                titulo: "El balance perfecto entre tranquilidad y modernidad.",
                texto: "Disfruta de la elegancia urbana sin perder la paz que tu familia necesita, rodeado de áreas verdes integradas.",
                img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=500&q=80"
            }
        ],
        desarrollo: {
            nombre: "RESIDENCIAL LOS ARCOS",
            img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
        }
    },
    "hermosillo": {
        nombre: "Hermosillo",
        lema: "Potencia industrial del norte",
        columnas: [
            {
                titulo: "El centro económico estratégico de Sonora.",
                texto: "Hermosillo resalta por su constante expansión urbana y seguridad, convirtiéndose en el destino favorito para la inversión inmobiliaria norteña.",
                img: "https://casasplatino.com/wp-content/uploads/2020/06/hermosillo1.jpg"
            },
            {
                titulo: "Diseños vanguardistas preparados para el entorno.",
                texto: "Estructuras residenciales de primer nivel equipadas con tecnología de aislamiento térmico eficiente y espacios de confort familiar.",
                img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=500&q=80"
            },
            {
                titulo: "Estilo de vida residencial exclusivo.",
                texto: "Privadas equipadas con amenidades de lujo como casa club, albercas recreativas y control de acceso inteligente las 24 horas.",
                img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=500&q=80"
            }
        ],
        desarrollo: {
            nombre: "KINO PREMIUM HOUSES",
            img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
        }
    },
    "celaya": {
        nombre: "Celaya",
        lema: "Ubicación privilegiada y diseño sustentable",
        columnas: [
            {
                titulo: "Inspirada en las nuevas tendencias Premium.",
                texto: "Privacidad, exclusividad y un diseño arquitectónico contemporáneo pensado en optimizar cada rincón de tu espacio.",
                img: "https://visitmexico.com/media/usercontent/6800573aaf44a-cly-cover-1920x1080_gmxdot_jpg"
            },
            {
                titulo: "Amenidades completas pensadas para todos.",
                texto: "Disfruta de alberca templada, áreas de juegos infantiles y salones de usos múltiples sin salir de la seguridad de tu condominio.",
                img: "https://casasplatino.com/wp-content/uploads/2024/11/Pescara_Alberca.jpg"
            },
            {
                titulo: "Entornos verdes y sustentabilidad interior.",
                texto: "Viviendas rodeadas de una meticulosa planeación ecológica que integra la naturaleza en tu rutina diaria para un aire más limpio.",
                img: "https://i0.wp.com/raspberrymag.com/wp-content/uploads/2022/01/lareserva_galeria05.jpg?ssl=1"
            }
        ],
        desarrollo: {
            nombre: "LA RESERVA (MODELO BARI)",
            img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
        }
    }
};

// LÓGICA DE EXTRACCIÓN DINÁMICA
const urlParams = new URLSearchParams(window.location.search);
const ciudadSeleccionada = urlParams.get('id') || "san-miguel"; // Carga San Miguel por defecto

const datosCiudad = infoCiudades[ciudadSeleccionada];

if (datosCiudad) {
    // Reemplazar textos e imágenes principales
    document.getElementById("lblNombreCiudad").innerText = datosCiudad.nombre;
    document.getElementById("lblLemaCiudad").innerText = datosCiudad.lema;
    document.getElementById("lblCiudadBanner").innerText = datosCiudad.nombre;

    // Iterar para rellenar las 3 columnas informativas
    for (let i = 0; i < 3; i++) {
        document.getElementById(`colTitulo${i + 1}`).innerText = datosCiudad.columnas[i].titulo;
        document.getElementById(`colTexto${i + 1}`).innerText = datosCiudad.columnas[i].texto;
        document.getElementById(`colImg${i + 1}`).src = datosCiudad.columnas[i].img;
    }

    // Rellenar sección de desarrollos
    document.getElementById("txtNombreDesarrollo").innerText = datosCiudad.desarrollo.nombre;
    document.getElementById("txtUbicacionDesarrollo").innerText = datosCiudad.nombre.toUpperCase();
    document.getElementById("imgDesarrollo").src = datosCiudad.desarrollo.img;
}