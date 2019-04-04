import React from 'react';

const CalendarDay = (props) => (
  <div onClick={props.createReminder} className="testcol square">
    <div className="text">
      {props.dayNumber}
    </div>
  </div>
)
export default CalendarDay;
