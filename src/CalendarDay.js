import React from 'react';

const CalendarDay = (props) => (
  <div className="testcol square" onClick={() => props.addReminderToDate('testReminder', props.date)}>
    <div className="text">
      {props.dayNumber}
    </div>
  </div>
)
export default CalendarDay;
