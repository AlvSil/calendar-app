import React from 'react';

const CalendarDay = (props) => (
    <div className="testcol square" onClick={() => props.setReminderDate(props.date)}>
      <div className="text">
        {props.dayNumber}
      </div>
      <div>
        {props.reminderList.map(reminder => <input type="button" className="text" value={reminder.text} onClick={() => props.loadReminder(reminder)}></input>)}
      </div>
    </div>
  )
export default CalendarDay;
