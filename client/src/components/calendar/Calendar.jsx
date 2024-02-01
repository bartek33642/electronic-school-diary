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
