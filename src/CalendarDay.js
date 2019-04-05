import React from 'react';

const CalendarDay = (props) => (
  <div className="testcol square" onClick={() => props.setReminderDate(props.date)}>
    <div className="text">
      {props.dayNumber}
    </div>
  </div>
)
export default CalendarDay;
