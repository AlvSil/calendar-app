import React, { Component } from 'react';
import CalendarDay from './CalendarDay';

import { connect } from 'react-redux'
import { addReminderToDate, deleteReminder, updateReminder } from './actions'

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
      selectedDay: null,
      selectedMonth: null,
      selectedYear: null,
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
      reminderTextInput: "",
      isReminderSelected: false,
      selectedReminderId: null
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
  loadReminder = (reminder) => this.setState({
    selectedHours: reminder.date.getHours(),
    selectedMinutes: reminder.date.getMinutes(),
    reminderTextInput: reminder.text,
    reminderDate: reminder.date,
    isReminderSelected: true,
    selectedReminderId: reminder.id
  });
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
                setReminderDate={this.setReminderDate}
                reminderList={this.getRemindersByDate(index+1, this.state.visibleDate.getMonth()+1)}
                loadReminder={this.loadReminder}
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
            <select disabled={this.state.reminderDate === null} onChange={
                (e) => this.setState({
                  reminderDate: new Date(this.state.reminderDate.setHours(e.target.value)),
                  selectedHours: e.target.value
                })}>
              {this.state.hours.map((empty, index) => <option value={index}>{index}</option>)}
            </select>
            <select disabled={this.state.reminderDate === null} onChange={
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
            <input disabled={this.state.reminderDate === null || this.state.reminderTextInput === "" || this.state.isReminderSelected} type="button" value="Add" onClick={() => this.props.addReminderToDate(this.state.reminderTextInput, this.state.reminderDate)} />
            <input disabled={!this.state.isReminderSelected} type="button" value="Update"
              onClick={() => {
                this.props.updateReminder(this.state.selectedReminderId, this.state.reminderTextInput, this.state.reminderDate);
                this.setState({
                  selectedReminderId: null,
                  isReminderSelected: false
              })
            }} />
            <input disabled={!this.state.isReminderSelected} type="button" value="Delete"
              onClick={() => {
                this.props.deleteReminder(this.state.selectedReminderId)
                this.setState({
                  selectedReminderId: null,
                  isReminderSelected: false
                })
              }} />
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
  addReminderToDate: (text, date) => dispatch(addReminderToDate(text, date)),
  deleteReminder: id => dispatch(deleteReminder(id)),
  updateReminder: (id, text, date) => dispatch(updateReminder(id, text, date))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
