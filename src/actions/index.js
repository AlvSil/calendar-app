let nextReminderId = 0

export const addReminderToDate = (text, date) => ({
  id: nextReminderId++,
  type: 'ADD_REMINDER',
  text,
  date
})

export const deleteReminder = (reminderId) => ({
  reminderId,
  type: 'DELETE_REMINDER'
})

export const updateReminder = (reminderId, text, date) => ({
  reminderId,
  type: 'UPDATE_REMINDER',
  text,
  date
})
