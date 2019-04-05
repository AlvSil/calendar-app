import React, { Component } from 'react';
import CalendarDay from './CalendarDay';
import './Calendar.css';

class Calendar extends Component {
  constructor() {
    super();
    function getAmountOfDaysInMonth(date) {
      return new Date(date.getFullYear(), date.getMonth()+1,0).getDate();
    };
    this.state = {
      visibleDate: new Date(),
      numberOfDays: new Array(getAmountOfDaysInMonth(new Date())).fill(null),
      selectedDay: 3,
      daysOfTheWeek: [
        {abb:'Sun'},
        {abb:'Mon'},
        {abb:'Tue'},
        {abb:'Wed'},
        {abb:'Thu'},
        {abb:'Fri'},
        {abb:'Sat'}
      ]
    }
  }
  addReminderToDate(reminderText, reminderDate) {
    console.log('reminderText', reminderText);
    console.log('reminderDate', reminderDate);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.daysOfTheWeek.map((day) => (
            <div key={day.abb} className='testcol'>
              <div className="weekdaysText">
                {day.abb}
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {this.state.numberOfDays.map((num, index) => 
            <CalendarDay
              key={index+1}
              dayNumber={index+1}
              date={new Date(this.state.visibleDate.getFullYear(), this.state.visibleDate.getMonth(), index+1)}
              addReminderToDate={this.addReminderToDate}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Calendar;
