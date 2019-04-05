import React from 'react';

const CalendarDay = (props) => (
    <div className="testcol square" onClick={() => props.setReminderDate(props.date)}>
      <div className="text">
        {props.dayNumber}
      </div>
      <div>
        {props.reminderList.map(reminder => <div className="text">{reminder.text}</div>)}
      </div>
    </div>
  )
export default CalendarDay;
