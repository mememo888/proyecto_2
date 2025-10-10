document.addEventListener('DOMContentLoaded', function() {
    
    const monthYearElement = document.getElementById('month-year');
    const daysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');

    if (!monthYearElement || !daysElement || !prevMonthButton || !nextMonthButton) {
        console.error("No se encontraron todos los elementos del calendario en el DOM.");
        return;
    }

    let currentDate = new Date();
    
    function renderCalendar() {
        const date = new Date(currentDate);
        date.setDate(1);

        const firstDayIndex = date.getDay(); // 0 (Dom) a 6 (Sáb)
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const nextDays = lastDayIndex === 6 ? 0 : (7 - lastDayIndex - 1); // Calcular días para rellenar

        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];

        monthYearElement.textContent = `${months[date.getMonth()]} ${date.getFullYear()}`;

        let daysHtml = "";
        
        for (let x = firstDayIndex; x > 0; x--) {
            daysHtml += `<div class="col"><span class="badge bg-light text-secondary p-2 w-100">${prevLastDay - x + 1}</span></div>`;
        }

        const today = new Date();
        for (let i = 1; i <= lastDay; i++) {
            const isToday = i === today.getDate() && 
                            date.getMonth() === today.getMonth() && 
                            date.getFullYear() === today.getFullYear();

            const dayClass = isToday ? 'bg-primary text-white fw-bold' : 'bg-light text-dark';

            daysHtml += `<div class="col"><span class="badge ${dayClass} p-2 w-100">${i}</span></div>`;
        }

        for (let j = 1; j <= nextDays; j++) {
            daysHtml += `<div class="col"><span class="badge bg-light text-secondary p-2 w-100">${j}</span></div>`;
        }
        
        daysElement.innerHTML = daysHtml;
    }
    
    /**
     * Función para cambiar el mes, manejando la transición de fecha.
     * @param {number} offset - Cantidad de meses a mover (-1 para anterior, 1 para siguiente).
     */
    function changeMonth(offset) {
        // Nota: Si quieres animación, debes agregar las clases CSS para 'fade-out' y 'fade-in'.
        // Aquí he simplificado la lógica de transición.
        currentDate.setMonth(currentDate.getMonth() + offset);
        renderCalendar();
    }

    // 3. Asignar Event Listeners
    prevMonthButton.addEventListener('click', () => {
        changeMonth(-1);
    });
    
    nextMonthButton.addEventListener('click', () => {
        changeMonth(1);
    });
    
    // 4. Inicialización
    renderCalendar();
});

document.addEventListener('DOMContentLoaded', function() {
    
    const chartElement = document.getElementById('myChart');

    if (chartElement) {
        var ctx = chartElement.getContext("2d");
        
        // Definir un color primario para el dashboard (simulación de una variable global)
        const primaryColor = '#007bff'; // Azul de Bootstrap

        var gradient = ctx.createLinearGradient(0, 0, 0, 225);
        gradient.addColorStop(0, "rgba(0, 123, 255, 0.4)"); // 40% de opacidad del color primario
        gradient.addColorStop(1, "rgba(0, 123, 255, 0)"); // Transparente

        new Chart(ctx, {
            type: "line",
            data: {
                labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
                datasets: [{
                    label: "Ventas ($)",
                    fill: true,
                    backgroundColor: gradient,
                    borderColor: primaryColor,
                    tension: 0.4, // Suaviza la línea
                    pointRadius: 3,
                    data: [
                        2115, 1562, 1584, 1892, 1587, 1923,
                        2566, 2448, 2805, 3438, 2917, 3327
                    ]
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    x: { // Configuración para Chart.js v3+ (si usas v2.x, usa 'xAxes')
                        grid: {
                            display: false
                        }
                    },
                    y: { // Configuración para Chart.js v3+
                        beginAtZero: true,
                        grid: {
                            borderDash: [5, 5],
                            color: 'rgba(0, 0, 0, 0.1)'
                        },
                        ticks: {
                            callback: function(value) {
                                return '$' + value;
                            },
                            stepSize: 1000
                        }
                    }
                }
            }
        });
    }
});