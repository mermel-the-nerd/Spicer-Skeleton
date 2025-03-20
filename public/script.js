const calendarDates = document.querySelector('.calendar-dates');
const monthYear = document.getElementById('month-year');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const dateGone = document.getElementById('date');

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
    e.stopPropagation(); // Ensures it doesn't bubble up to the form
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextMonthBtn.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Ensures it doesn't bubble up to the form
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
        const day = e.target.textContent;
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        document.getElementById('date').value = dateStr;

        document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('date'));
        e.target.classList.add('date');
    }
    console.log(document.getElementById('date').value)
});

// this is not right. ineed help
// use input datepicker . display hidden. + name is date or smn . push date to the value