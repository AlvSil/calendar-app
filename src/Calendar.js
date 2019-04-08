import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addReminderToDate, deleteReminder, updateReminder } from './actions';
import ReminderFields from './ReminderFields';
import CalendarDay from './CalendarDay';

import './Calendar.css';

class Calendar extends Component {
  constructor() {
    super();
    this.state = {
      visibleDate: new Date(),
      selectedDay: null,
      selectedMonth: null,
      selectedYear: null,
      reminderDate: null,
      selectedHours: "0",
      selectedMinutes: "0",
      reminderTextInput: "",
      isReminderSelected: false,
      selectedReminderId: null,
      reminderColor: "#008000"
    }
  }

  colorList = [
    {
      code: "#008000",
      name: "green",
    },
    {
      code: "#FFFF00",
      name: "yellow",
    },
    {
      code: "#FF0000",
      name: "red",
    }
  ];
  daysOfTheWeek = [
    {abb:'Sun'},
    {abb:'Mon'},
    {abb:'Tue'},
    {abb:'Wed'},
    {abb:'Thu'},
    {abb:'Fri'},
    {abb:'Sat'}
  ];
  amountOfDays = new Array(this.getAmountOfDaysInMonth(new Date())).fill(null);
  amountOfHours = new Array(24).fill(null);
  amountOfMinutes = new Array(60).fill(null);

  getAmountOfDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth()+1,0).getDate();
  }
  setReminderDate = (date) => {
    let updatedHours = new Date(date.setHours(this.state.selectedHours));
    let updatedTime = new Date(updatedHours.setMinutes(this.state.selectedMinutes));
    this.setState({
      selectedDay: date.getDate(),
      selectedMonth: date.getMonth()+1,
      selectedYear: date.getFullYear(),
      reminderDate: updatedTime,
      isReminderSelected: false
    })
  }
  getRemindersByDate = (day, month) => this.props.reminders.filter(reminder => reminder.date.getMonth()+1 === month && reminder.date.getDate() === day);
  loadReminder = (reminder) => {
    this.setState({
      selectedHours: reminder.date.getHours(),
      selectedMinutes: reminder.date.getMinutes(),
      reminderTextInput: reminder.text,
      reminderDate: reminder.date,
      isReminderSelected: true,
      selectedReminderId: reminder.id,
      reminderColor: reminder.color
    });
  }
  deleteReminder = () => {
    this.props.deleteReminder(this.state.selectedReminderId)
    this.setState({
      selectedReminderId: null,
      isReminderSelected: false
    })
  }
  updateReminder = () => {
    this.props.updateReminder(this.state.selectedReminderId, this.state.reminderTextInput, this.state.reminderDate, this.state.reminderColor);
    this.setState({
      selectedReminderId: null,
      isReminderSelected: false
    })
  }
  updateReminderColor = (colorValue) => {
    this.setState({
      reminderColor: colorValue
    })
  }
  updateReminderText = (reminderTextInput) => {
    this.setState({reminderTextInput})
  }
  updateHours = (hours) => {
    this.setState({
      reminderDate: new Date(this.state.reminderDate.setHours(hours)),
      selectedHours: hours
    })
  }
  updateMinutes = (minutes) => {
    this.setState({
      reminderDate: new Date(this.state.reminderDate.setMinutes(minutes)),
      selectedMinutes: minutes
    })
  }
  render() {
    console.log('calendar state', this.state)
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            {this.daysOfTheWeek.map((day) => (
              <div key={day.abb} className='testcol'>
                <div className="weekdaysText">
                  {day.abb}
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            {this.amountOfDays.map((empty, index) => 
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
        <ReminderFields
          amountOfHours={this.amountOfHours}
          amountOfMinutes={this.amountOfMinutes}
          colorList={this.colorList}
          selectedDay={this.state.selectedDay}
          selectedMonth={this.state.selectedMonth}
          selectedYear={this.state.selectedYear}
          reminderDate={this.state.reminderDate}
          reminderTextInput={this.state.reminderTextInput}
          reminderColor={this.state.reminderColor}
          isReminderSelected={this.state.isReminderSelected}
          updateHours={this.updateHours}
          updateMinutes={this.updateMinutes}
          updateReminderText={this.updateReminderText}
          updateReminderColor={this.updateReminderColor}
          addReminderToDate={this.props.addReminderToDate}
          deleteReminder={this.deleteReminder}
          updateReminder={this.updateReminder}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => ({
  addReminderToDate: (text, date, color) => dispatch(addReminderToDate(text, date, color)),
  deleteReminder: id => dispatch(deleteReminder(id)),
  updateReminder: (id, text, date, color) => dispatch(updateReminder(id, text, date, color))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)
