const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/* render calendar */
function renderCalendar(month, year) {
    calendarDates.innerHTML = ''; // Clear previous dates
    monthYear.textContent = `${months[month]} ${year}`;
  
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
  
    // Create blanks for days of the week before the first day
    for (let i = 0; i < firstDay; i++) {
        const blank = document.createElement('div');
        blank.classList.add('blank');
        calendarDates.appendChild(blank);
    }
  
    const today = new Date();
  
    // Populate the days
    for (let i = 1; i <= daysInMonth; i++) {
        const day = document.createElement('div');
        day.textContent = i;
        day.classList.add('calendar-day');

        // Highlight today's date
        if (
            i === today.getDate() &&
            year === today.getFullYear() &&
            month === today.getMonth()
        ) {
            day.classList.add('current-date');
        }

        calendarDates.appendChild(day);
    }
}

// Initial rendering
renderCalendar(currentMonth, currentYear);

/* Navigate between months */
prevMonthBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

/* Alert date on user click */
calendarDates.addEventListener('click', (e) => {
    if (e.target.classList.contains('calendar-day')) {
        alert(`You clicked on ${e.target.textContent} ${months[currentMonth]} ${currentYear}`);
    }
});
  