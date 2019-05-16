const app = document.getElementById('app');
const monthsList = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

const daysList = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

function getDate(year, month) {
  const dateObj = new Date(year, month);
  const daysInMonthObj = new Date(year, month + 1, 0);
  const startDay = dateObj.getDay();
  const daysInMonth = daysInMonthObj.getDate();
  return { dateObj, startDay, daysInMonth };
}
//

function createMonth(year, monthNumber) {
  // create month container
  const month = document.createElement('div');
  month.className = 'month';

  // create inner month table
  const monthTable = document.createElement('table');
  monthTable.className = 'monthTable';

  // create month caption
  const caption = document.createElement('caption');
  caption.className = 'monthTable__caption';
  caption.textContent = monthsList[monthNumber];
  monthTable.appendChild(caption);

  // create month days of week
  const daysOfWeek = document.createElement('thead');
  daysOfWeek.className = 'monthTable__daysOfWeek';
  const daysOfWeekRow = document.createElement('tr');
  daysList.forEach(day => {
    const dayCell = document.createElement('td');
    dayCell.textContent = day;
    daysOfWeekRow.appendChild(dayCell);
  });
  daysOfWeek.appendChild(daysOfWeekRow);
  monthTable.appendChild(daysOfWeek);

  // create days
  const daysOfMonth = document.createElement('tbody');
  daysOfMonth.className = 'monthTable__daysOfMonth';

  const { startDay, daysInMonth } = getDate(year, monthNumber);
  let firstRow = true;
  let numberOfDate = 1;
  let value = '';
  for (f = 0; f < 6; f++) {
    let daysOfMonthCol = document.createElement('tr');
    daysOfMonth.appendChild(daysOfMonthCol);
    for (d = 0; d < 7; d++) {
      const daysOfMonthRow = document.createElement('td');
      if (startDay === d && firstRow) {
        value = numberOfDate;
        firstRow = false;
      } else if (!firstRow) {
        value = numberOfDate;
        if (numberOfDate > daysInMonth) {
          value = '';
        }
      }
      daysOfMonthRow.innerText = value;
      daysOfMonthCol.appendChild(daysOfMonthRow);
      if (!firstRow) numberOfDate++;
    }
  }
  monthTable.appendChild(daysOfMonth);

  // add table to month
  month.appendChild(monthTable);
  // add month
  app.appendChild(month);
}

monthsList.forEach((month, index) => createMonth(2019, index));
