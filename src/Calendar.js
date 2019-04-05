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
      selectedDay: new Date().getDate(),
      selectedMonth: new Date().getMonth()+1,
      selectedYear: new Date().getFullYear(),
      daysOfTheWeek: [
        {abb:'Sun'},
        {abb:'Mon'},
        {abb:'Tue'},
        {abb:'Wed'},
        {abb:'Thu'},
        {abb:'Fri'},
        {abb:'Sat'}
      ],
      hours: new Array(24).fill(null),
      minutes: new Array(60).fill(null),
      reminderDate: null,
      selectedHours: "0",
      selectedMinutes: "0",
      reminderTextInput: ""
    }
  }
  setReminderDate = (date) => {
    let updatedHours = new Date(date.setHours(this.state.selectedHours));
    let updatedTime = new Date(updatedHours.setMinutes(this.state.selectedMinutes));
    this.setState({
      selectedDay: date.getDate(),
      selectedMonth: date.getMonth()+1,
      selectedYear: date.getFullYear(),
      reminderDate: updatedTime
    })
  }
  getRemindersByDate = (day, month) => this.props.reminders.filter(reminder => reminder.date.getMonth()+1 === month && reminder.date.getDate() === day);

  render() {
    return (
      <React.Fragment>
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
            {this.state.numberOfDays.map((empty, index) => 
              <CalendarDay
                key={index}
                dayNumber={index + 1}
                date={new Date(this.state.visibleDate.getFullYear(), this.state.visibleDate.getMonth(), index + 1)}
                addReminderToDate={this.props.addReminderToDate}
                setReminderDate={this.setReminderDate}
                reminderList={this.getRemindersByDate(index+1, this.state.visibleDate.getMonth()+1)}
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className="row">
            <label>Day</label>
            <input id="day" value={`${this.state.selectedDay}/${this.state.selectedMonth}/${this.state.selectedYear}`}></input>
          </div>
          <div className="row">
            <label>Time</label>
            <select onChange={
                (e) => this.setState({
                  reminderDate: new Date(this.state.reminderDate.setHours(e.target.value)),
                  selectedHours: e.target.value
                })}>
              {this.state.hours.map((empty, index) => <option value={index}>{index}</option>)}
            </select>
            <select onChange={
                (e) => this.setState({
                  reminderDate: new Date(this.state.reminderDate.setMinutes(e.target.value)),
                  selectedMinutes: e.target.value
                })}>
              {this.state.minutes.map((empty, index) => <option value={index}>{index}</option>)}
            </select>
          </div>
          <div className="row">
            <label>Reminder</label>
            <input value={this.state.reminderTextInput} onChange={(e) => this.setState({reminderTextInput: e.target.value})} maxLength="30"/>
          </div>
          <div className="row">
            <input type="button" value="Add" onClick={() => this.props.addReminderToDate(this.state.reminderTextInput, this.state.reminderDate)} />
          </div>
        </div>
      </React.Fragment>
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
