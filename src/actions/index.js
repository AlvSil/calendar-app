let nextReminderId = 0

export const addReminderToDate = (text, date, color) => ({
  id: nextReminderId++,
  type: 'ADD_REMINDER',
  text,
  date,
  color
})

export const deleteReminder = (reminderId) => ({
  reminderId,
  type: 'DELETE_REMINDER'
})

export const updateReminder = (reminderId, text, date, color) => ({
  reminderId,
  type: 'UPDATE_REMINDER',
  text,
  date,
  color
})
