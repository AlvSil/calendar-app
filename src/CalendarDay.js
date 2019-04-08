import React from 'react';

const CalendarDay = (props) => (
    <div className="testcol square" onClick={() => props.setReminderDate(props.date)}>
      <div className="text dayNumber">
        {props.dayNumber}
      </div>
      <div>
        {props.reminderList.map(reminder => 
          <input style={{backgroundColor:reminder.color}}
            type="button"
            className="text"
            value={`${reminder.date.getHours()}:${reminder.date.getMinutes() < "10" ? "0" + reminder.date.getMinutes() : reminder.date.getMinutes()} - ${reminder.text}`}
            onClick={(e) => {
              e.stopPropagation();
              props.loadReminder(reminder);
            }}
          />)}
      </div>
    </div>
  )
export default CalendarDay;
