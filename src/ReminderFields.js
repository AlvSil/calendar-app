import React from 'react';

const ReminderFields = ({
  amountOfHours,
  amountOfMinutes,
  colorList,
  selectedDay,
  selectedMonth,
  selectedYear,
  reminderDate,
  reminderTextInput,
  reminderColor,
  isReminderSelected,
  updateHours,
  updateMinutes,
  updateReminderText,
  updateReminderColor,
  addReminderToDate,
  deleteReminder,
  updateReminder
}) => (
  <div className="container">
    <div className="row">
      <label>Day</label>
      <input id="day" value={`${selectedDay}/${selectedMonth}/${selectedYear}`} readOnly />
    </div>
    <div className="row">
      <label>Time</label>
      <select disabled={reminderDate === null} onChange={(e) => updateHours(e.target.value)}>
        {amountOfHours.map((empty, index) => <option key={index} value={index}>{index}</option>)}
      </select>
      <select disabled={reminderDate === null} onChange={(e) => updateMinutes(e.target.value)}>
        {amountOfMinutes.map((empty, index) => <option key={index} value={index}>{index}</option>)}
      </select>
    </div>
    <div className="row">
      <label>Reminder</label>
      <input value={reminderTextInput} onChange={(e) => updateReminderText(e.target.value)} maxLength="30"/>
    </div>
    <div className="row">
      <label>Reminder Color</label>
      <select disabled={reminderDate === null} value={reminderColor} onChange={(e) => updateReminderColor(e.target.value)}>
        {colorList.map((color) => <option key={color.name} value={color.code}>{color.name}</option>)}
      </select>
    </div>
    <div className="row">
      <input disabled={reminderDate === null || reminderTextInput === "" || isReminderSelected} type="button" value="Add" onClick={() => addReminderToDate(reminderTextInput, reminderDate, reminderColor)} />
      <input disabled={!isReminderSelected} type="button" value="Update" onClick={() => updateReminder()} />
      <input disabled={!isReminderSelected} type="button" value="Delete" onClick={() => deleteReminder()} />
    </div>
  </div>
  )
export default ReminderFields;
