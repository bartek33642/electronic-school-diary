// import React from 'react';
// import './Calendar.css';
// // import Calendar from 'react-calendar';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import { plPL } from '@mui/x-date-pickers';

// export  function CalendarComponent() {
//     // const [value, onChange] = useState(new Date());
//   return (
//     <>
//     <LocalizationProvider dateAdapter={AdapterDayjs} locale={plPL}>
//       <DateCalendar />
//     </LocalizationProvider>
//     </>
//     // <Calendar onChange={onChange} value={value}/>
//   );
// }


import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import pl from 'date-fns/locale/pl';
import './Calendar.css';

export function CalendarComponent() {
  const [value, onChange] = useState(new Date());

  return (
    <Calendar className='calendar-box'
      onChange={onChange}
      value={value}
      locale={pl}
    />
  );
}
