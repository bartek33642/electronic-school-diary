import React, { useState } from 'react';
import Calendar from 'react-calendar';

export  function CalendarComponent() {
    const [value, onChange] = useState(new Date());
  return (


    <Calendar onChange={onChange} value={value}/>
  );
}
