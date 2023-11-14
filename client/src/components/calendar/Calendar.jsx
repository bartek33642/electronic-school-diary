import React from 'react';
import './Calendar.css';
// import Calendar from 'react-calendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

export  function CalendarComponent() {
    // const [value, onChange] = useState(new Date());
  return (
    <>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar/>
    </LocalizationProvider>
    </>
    // <Calendar onChange={onChange} value={value}/>
  );
}
