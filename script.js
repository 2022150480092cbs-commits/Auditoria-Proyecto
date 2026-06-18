const proyectos = [
    { id: 1, nombre: "Edificio Roma", riesgo: "bajo", tipo: "deuda", rendimiento: 12 },
    { id: 2, nombre: "Departamentos Polanco", riesgo: "medio", tipo: "copropiedad", rendimiento: 18 },
    { id: 3, nombre: "Plaza Comercial", riesgo: "alto", tipo: "deuda", rendimiento: 22 }
];

// Mostrar proyectos
function cargarProyectos() {
    let contenedor = document.getElementById("listaProyectos");
    contenedor.innerHTML = "";

    proyectos.forEach(p => {
        contenedor.innerHTML += `
            <div class="card">
                <h3>${p.nombre}</h3>
                <p>Riesgo: ${p.riesgo}</p>
                <p>Tipo: ${p.tipo}</p>
                <p>Rendimiento: ${p.rendimiento}%</p>
            </div>
        `;
    });
}

// Buscador simple (base para IA)
function buscar() {
    let texto = document.getElementById("busqueda").value.toLowerCase();

    let filtrados = proyectos.filter(p =>
        p.riesgo.includes(texto) || p.tipo.includes(texto)
    );

    mostrarFiltrados(filtrados);
}

function mostrarFiltrados(lista) {
    let contenedor = document.getElementById("listaProyectos");
    contenedor.innerHTML = "";

    lista.forEach(p => {
        contenedor.innerHTML += `
            <div class="card">
                <h3>${p.nombre}</h3>
                <p>Riesgo: ${p.riesgo}</p>
                <p>Tipo: ${p.tipo}</p>
                <p>Rendimiento: ${p.rendimiento}%</p>
            </div>
        `;
    });
}

// Recomendador básico (FASE 1)
function recomendar() {
    let recomendados = proyectos.filter(p => p.riesgo === "bajo");

    let contenedor = document.getElementById("recomendados");
    contenedor.innerHTML = "";

    recomendados.forEach(p => {
        contenedor.innerHTML += `
            <div class="card">
                <h3>${p.nombre}</h3>
                <p>Ideal para perfil conservador</p>
            </div>
        `;
    });
    const ctx = document.getElementById('graficaPlusvalia');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2021', '2022', '2023', '2024', '2025'],
            datasets: [{
                label: 'Incremento de Plusvalía %',
                data: [5, 12, 19, 25, 32],
                borderColor: '#00f2d3', // El turquesa de tu logo
                tension: 0.1
            }]
        }
    });
}
// Variable global para controlar que la gráfica no se duplique al presionar varias veces
let miGraficaVentas = null;

async function ejecutarAuditoriaIA() {
    const btn = document.getElementById("btnAuditar");
    const dashboard = document.getElementById("dashboardResultados");

    // Cambiamos el estado del botón para que el usuario sepa que está cargando
    btn.disabled = true;
    btn.innerText = "🧠 Analizando libros contables...";

    // 1. Tus datos reales de simulación de ventas para Residencial La Reserva
    const simulacionVentas = [
        { id: "Bari-01", modelo: "Modelo Bari", costo_construccion: 1200000, precio_venta: 1925000, meses_en_mercado: 4 },
        { id: "Bari-02", modelo: "Modelo Bari", costo_construccion: 1200000, precio_venta: 1950000, meses_en_mercado: 7 },
        { id: "Bari-03", modelo: "Modelo Bari", costo_construccion: 1250000, precio_venta: 1910000, meses_en_mercado: 3 }
    ];

    // NOTA ACADÉMICA: Para evitar exponer llaves en producción, en proyectos reales se usa un servidor. 
    // Para efectos de tu simulación escolar, se consume de forma directa y ágil:
    const tuApiKeyProvisional = "sk-proj-POR-SEGURIDAD-GENERA-UNA-NUEVA-LLAVE-EN-OPENAI";

    try {
        // 2. Petición HTTP directa al motor de OpenAI
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tuApiKeyProvisional}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "Actúas como un sistema contable de auditoría inmobiliaria para JACCAF COMPANY. Analiza el JSON recibido y devuelve UNICAMENTE un formato JSON limpio con los campos: ganancia_total (número), margen_promedio (número) y dictamen (texto explicativo de rendimiento relativo al tiempo)."
                    },
                    {
                        role: "user",
                        content: JSON.stringify(simulacionVentas)
                    }
                ],
                temperature: 0.3
            })
        });

        const data = await response.json();

        // Procesamos y limpiamos el JSON de respuesta de la IA
        const respuestaTexto = data.choices[0].message.content.replace(/```json|```/g, "").trim();
        const auditoriaFinal = JSON.parse(respuestaTexto);

        // 3. Pintar los datos analíticos calculados por la IA en tus tarjetas
        document.getElementById("txtGanancia").innerText = `$${auditoriaFinal.ganancia_total.toLocaleString()}`;
        document.getElementById("txtMargen").innerText = `${auditoriaFinal.margen_promedio}%`;
        document.getElementById("txtDictamen").innerText = `"${auditoriaFinal.dictamen}"`;

        // 4. Inicializar y dibujar la gráfica de Chart.js dinámicamente
        const ctx = document.getElementById('graficaVentasIA').getContext('2d');

        if (miGraficaVentas) {
            miGraficaVentas.destroy(); // Resetea la gráfica si ya existía
        }

        miGraficaVentas = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: simulacionVentas.map(c => c.id),
                datasets: [
                    {
                        label: 'Costo de Construcción ($)',
                        data: simulacionVentas.map(c => c.costo_construccion),
                        backgroundColor: '#1a2a38',
                        borderRadius: 4
                    },
                    {
                        label: 'Precio de Venta ($)',
                        data: simulacionVentas.map(c => c.precio_venta),
                        backgroundColor: '#00f2d3',
                        borderRadius: 4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Hacemos visible el tablero con una transición limpia
        dashboard.classList.remove("hidden");

    } catch (error) {
        console.error("Error en la auditoría con IA:", error);
        alert("Ocurrió un inconveniente al procesar los datos contables con la IA.");
    } finally {
        // Restauramos el botón a su estado original
        btn.disabled = false;
        btn.innerText = "⚡ Ejecutar Auditoría Financiera";
    }
}


// Inicializar
cargarProyectos();
recomendar();
