document.addEventListener('DOMContentLoaded', function() {

    const monthYearElement = document.getElementById('month-year');
    const daysElement = document.getElementById('calendar-days');
    const prevMonthButton = document.getElementById('prev-month');
    const nextMonthButton = document.getElementById('next-month');
    if (!monthYearElement || !daysElement || !prevMonthButton || !nextMonthButton) {
        return;
    }
 
    let currentDate = new Date();
     function renderCalendar() {
        const date = new Date(currentDate);
        date.setDate(1);
        const firstDayIndex = date.getDay();
        const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const prevLastDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDay();
        const nextDays = 7 - lastDayIndex - 1;
 
        const months = [
            "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
        ];
 
        monthYearElement.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
 
        let days = "";
 
        for (let x = firstDayIndex; x > 0; x--) {
            days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
        }
 
        for (let i = 1; i <= lastDay; i++) {
            if (i === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                days += `<div class="today">${i}</div>`;
            } else {
                days += `<div>${i}</div>`;
            }
        }
 
        for (let j = 1; j <= nextDays; j++) {
            days += `<div class="next-date">${j}</div>`;
        }
        
        daysElement.innerHTML = days;
    }
        function changeMonth(offset) {
        daysElement.classList.add('fade-out');
        
        setTimeout(() => {
            currentDate.setMonth(currentDate.getMonth() + offset);
            renderCalendar();
            daysElement.classList.remove('fade-out');
            daysElement.classList.add('fade-in');
        }, 400);
        
        daysElement.classList.remove('fade-in');
    }

    prevMonthButton.addEventListener('click', () => {
        changeMonth(-1);
    });
 
    nextMonthButton.addEventListener('click', () => {
        changeMonth(1);
    });
    renderCalendar();
    daysElement.classList.add('fade-in');
});
