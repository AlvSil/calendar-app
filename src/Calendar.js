import React, { Component } from 'react';
import CalendarDay from './CalendarDay';

import { connect } from 'react-redux'
import { addReminderToDate } from './actions'

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
              key={index}
              dayNumber={index + 1}
              date={new Date(this.state.visibleDate.getFullYear(), this.state.visibleDate.getMonth(), index + 1)}
              addReminderToDate={this.props.addReminderToDate}
            />
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  addReminderToDate: (text, date) => dispatch(addReminderToDate(text, date))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
