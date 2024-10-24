const ratingsData = JSON.parse(localStorage.getItem('ratingsData')) || {};
const lastSubmitTime = localStorage.getItem('lastSubmitTime');
let selectedDate = new Date();

// Set the current date and display the calendar
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').value = today;

// Check if the last submission was less than 24 hours ago
if (lastSubmitTime && (new Date() - new Date(lastSubmitTime) < 86400000)) {
    document.getElementById('submitBtn').disabled = true;
    alert("Vous devez attendre 24 heures entre les évaluations.");
}

// Initialize the calendar
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';

    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();

    const header = document.createElement('div');
    header.className = 'calendar-header';
    header.innerHTML = `
        <button onclick="changeMonth(-1)">Précédent</button>
        <h2>${monthNames[month]} ${year}</h2>
        <button onclick="changeMonth(1)">Suivant</button>
    `;
    calendar.appendChild(header);

    const daysOfWeek = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const daysHeader = document.createElement('div');
    daysHeader.className = 'calendar-days';
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.innerText = day;
        daysHeader.appendChild(dayElement);
    });
    calendar.appendChild(daysHeader);

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const daysGrid = document.createElement('div');
    daysGrid.className = 'calendar-days';
    for (let i = 0; i < firstDay; i++) {
        daysGrid.appendChild(document.createElement('div'));
    }

    for (let i = 1; i <= lastDate; i++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.innerText = i;
        dayElement.onclick = () => selectDate(i);
        if (i === selectedDate.getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
            dayElement.classList.add('selected');
        }
        daysGrid.appendChild(dayElement);
    }

    calendar.appendChild(daysGrid);
}

function changeMonth(direction) {
    selectedDate.setMonth(selectedDate.getMonth() + direction);
    renderCalendar();
}

function selectDate(day) {
    selectedDate.setDate(day);
    renderCalendar();
    updateDateDisplay();
}

function updateDateDisplay() {
    const dateString = selectedDate.toISOString().split('T')[0];
    document.getElementById('date').innerText = dateString;
}

function submitRatings() {
    const date = selectedDate.toISOString().split('T')[0];
    const ratings = [];
    for (let i = 1; i <= 7; i++) {
        const rating = document.getElementById(`rating${i}`).value;
        ratings.push(rating ? parseInt(rating) : 0);
    }

    // Save to localStorage
    ratingsData[date] = ratings;
    localStorage.setItem('ratingsData', JSON.stringify(ratingsData));
    localStorage.setItem('lastSubmitTime', new Date());

    alert("Évaluations soumises!");
    document.getElementById('submitBtn').disabled = true;
    updateChartView();
}

function updateChartView() {
    // Update chart based on selected time frame (daily, weekly, monthly)
    // This function will contain logic to update the chart
}

// Initial rendering of the calendar
renderCalendar();
