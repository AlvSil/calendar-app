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
      numberOfDays: getAmountOfDaysInMonth(new Date()),
      selectedDay: 3,
      arrayOfNumbers: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className='testcol'>
            <div className="weekdaysText">
              Sun
            </div>
          </div>
          <div className='testcol'>
            <div className="weekdaysText">
              Mon
            </div>
          </div>
          <div className='testcol'>
            <div className="weekdaysText">
              Tue
            </div>
          </div>
          <div className='testcol'>
            <div className="weekdaysText">
              Wed
            </div>
          </div>
          <div className='testcol'>
            <div className="weekdaysText">
              Thu
            </div>
          </div>
          <div className='testcol'>
            <div className="weekdaysText">
              Fri
            </div>
          </div>
          <div className='testcol'>
            <div className="weekdaysText">
              Sat
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.arrayOfNumbers.map((num) => 
          <CalendarDay dayNumber={num} numberOfDays={30} />
          )}          
        </div>
      </div>
    );
  }
}
export default Calendar;
