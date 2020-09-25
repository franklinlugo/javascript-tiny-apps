const app = document.getElementById('app');
const months = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];
const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];

function getDate(year, month) {
  const date = new Date(year, month);
  const daysInMonthObj = new Date(year, month + 1, 0);
  const firstDayInMonth = date.getDay();
  const daysInMonth = daysInMonthObj.getDate();
  return { firstDayInMonth, daysInMonth };
}

function createMonth(year, monthNumber) {
  // create month container
  const monthContainer = document.createElement('div');
  monthContainer.className = 'month';

  // create inner month table
  const monthTable = document.createElement('table');
  monthTable.className = 'month__table';

  // create month caption
  const caption = document.createElement('caption');
  caption.className = 'month__table__caption';
  caption.textContent = months[monthNumber];
  monthTable.appendChild(caption);

  // create month days of week
  const daysOfWeek = document.createElement('thead');
  daysOfWeek.className = 'month__table__daysOfWeek';
  const daysOfWeekRow = document.createElement('tr');
  days.forEach(day => {
    const dayCell = document.createElement('td');
    dayCell.textContent = day;
    daysOfWeekRow.appendChild(dayCell);
  });
  daysOfWeek.appendChild(daysOfWeekRow);
  monthTable.appendChild(daysOfWeek);

  // create days
  const daysOfMonth = document.createElement('tbody');
  daysOfMonth.className = 'month__table__daysOfMonth';

  const { firstDayInMonth, daysInMonth } = getDate(year, monthNumber);
  const numberOfWeeks = [...Array(Math.ceil(daysInMonth / 7)).keys()].map(_ => _ + 1);

  let date = 1
  numberOfWeeks.forEach((week) => {
    let row = document.createElement('tr');
    let value;
    [...Array(7).keys()].forEach((dayOfWeek) => {
      let data = document.createElement('td');
      if (dayOfWeek < firstDayInMonth && week === 1 || date > daysInMonth) {
        value = '';
      } else {
        value = date;
        date++;
      }
      data.innerText = value;
      row.appendChild(data)
    })

    daysOfMonth.appendChild(row);
  })

  monthTable.appendChild(daysOfMonth);

  // add table to month
  monthContainer.appendChild(monthTable);

  // add month
  app.appendChild(monthContainer);
}

months.forEach((_, index) => createMonth(2020, index));
